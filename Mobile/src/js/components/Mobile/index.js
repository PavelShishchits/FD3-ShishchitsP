import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import './style.scss';
import isoFetch from 'isomorphic-fetch';
import { appEvents } from '../event';

import MobileClient from '../MobileClient/index';
import MobileForm from '../MobileForm/index';

import * as mModules from '../../modules/mobile';

import {fetchDataSuccess, fetchDataFailure} from '../../redux/actions/clientActions';

class Mobile extends React.PureComponent {

  static propTypes = {
    // path: PropTypes.string.isRequired,
    // clients: PropTypes.arrayOf(
    //   PropTypes.shape({
    //     id: PropTypes.number.isRequired,
    //     name: PropTypes.string.isRequired,
    //     surName: PropTypes.string.isRequired,
    //     secondName: PropTypes.string.isRequired,
    //     balance: PropTypes.number.isRequired,
    //     status: PropTypes.number.isRequired // 0 - неактивен, 1 - активен
    //   }).isRequired
    // ).isRequired
  };

  state = {
    clients: [],
    filteredClients: [],
    isLoaded: false,
    formMode: 0, // 1 - форма редактирования, 2 - форма добавления,
    clientToEdit: null,
    filterMod: 'all'
  };

  componentDidMount() {
    this.downloadData();
    // appEvents.addListener('EItemRemove', this.removeClient);
    // appEvents.addListener('EItemEdit', this.onClientEdit);
    // appEvents.addListener('EEditClient', this.editClient);
    // appEvents.addListener('EAddClient', this.addClient);
    // appEvents.addListener('ECloseForm', this.closeForm);
  }

  componentWillUnmount() {
    // appEvents.removeListener('EitemRemove', this.removeClient);
    // appEvents.removeListener('EItemEdit', this.onClientEdit);
    // appEvents.removeListener('EEditClient', this.editClient);
    // appEvents.removeListener('EAddClient', this.addClient);
    // appEvents.removeListener('ECloseForm', this.closeForm);
  }

  componentWillReceiveProps = (nextProps, nextContext) => {
    this.setState({clients: nextProps.clients, isLoaded: nextProps.isLoaded});
  };

  fetchError = (error) => {
    this.props.dispatch(fetchDataFailure(error));
  };

  fetchSuccess = (data) => {
    this.props.dispatch(fetchDataSuccess(data));
  };

  downloadData = () => {
    isoFetch("http://5c4ea42cd87cab001476ef73.mockapi.io/api/mts", {
      method: 'get',
      headers: {
        "Accept": "application/json",
      },
    })
      .then((response) => { // response - HTTP-ответ
        if (!response.ok) {
          let Err = new Error("fetch error " + response.status);
          Err.userMessage = "Ошибка связи";
          throw Err; // дальше по цепочке пойдёт отвергнутый промис
        } else
          return response.json(); // дальше по цепочке пойдёт промис с пришедшими по сети данными
      })
      .then((data) => {
        try {
          this.fetchSuccess(data); // передаём полезные данные в fetchSuccess, дальше по цепочке пойдёт успешный пустой промис
        } catch (error) {
          this.fetchError(error.message); // если что-то пошло не так - дальше по цепочке пойдёт отвергнутый промис
        }
      })
      .catch((error) => {
        this.fetchError(error.userMessage || error.message);
      });
  };

  editClient = (editedClient) => {
    const editedClients = mModules.editClient(this.state.clients, editedClient);
    this.setState({
      clients: editedClients,
      filteredClients: this.filterList(editedClients),
      formMode: 0,
      clientToEdit: null
    });
  };

  addClient = (client) => {
    const addedClients = mModules.addClient(this.state.clients, client);
    this.setState({
      clients: addedClients,
      filteredClients: this.filterList(addedClients),
      formMode: 0,
      clientToEdit: null
    });
  };

  removeClient = (id) => {
    const clients = mModules.removeClient(this.state.clients, id);
    this.setState({clients: clients, filteredClients: this.filterList(clients), formMode: 0});
  };

  onClientEdit = (id) => {
    this.setState({formMode: 1, clientToEdit: this.state.clients.find((client) => client.id === id)});
  };

  onClientAdd = () => {
    const id = this.state.clients.length ? this.state.clients[this.state.clients.length - 1].id + 1 : 1;
    this.setState({formMode: 2, clientToEdit: {id: id, name: '', surName: '', secondName: '', balance: 0, status: ''}})
  };

  closeForm = (formMode) => {
    this.setState({formMode: formMode});
  };

  filterList = (arr, type = this.state.filterMod) => {
    if (type === 'all') {
      return arr;
    } else {
      return arr.filter((item) => type === 'active' ? item.status === 1 : item.status === 0);
    }
  };

  onFilterClick = (e) => {
    const type = e.target.value;
    this.setState({filterMod: type, filteredClients: this.filterList(this.state.clients, type)})
  };

  render() {

    const clients = this.state.clients.map((client) => {
      return <MobileClient path={this.props.path} key={client.id} client={client}/>
    });

    return (

      <div className='mobile'>
        <div className='mobile__filter'>
          <button className='btn filter-all' value='all' onClick={this.onFilterClick}>Все</button>
          <button className='btn filter-active' value='active' onClick={this.onFilterClick}>Активные</button>
          <button className='btn filter-unavail' value='unavail' onClick={this.onFilterClick}>Заблокированные</button>
        </div>
        <table className='mobile__clients'>
          <thead>
          <tr>
            <td>Фамилия</td>
            <td>Имя</td>
            <td>Отчетсво</td>
            <td>Баланс</td>
            <td>Статус</td>
            <td>Управление</td>
          </tr>
          </thead>
          <tbody>
          {
            (!this.state.isLoaded) ?
              <tr>
                <td>Загрузка данных...</td>
              </tr>
              :
              this.state.clients.length ?
                clients
                :
                <tr>
                  <td>Клиентов нет</td>
                </tr>
          }
          </tbody>
        </table>
        <div className='mobile__add'>
          <button className='btn edit-btn add-client' onClick={this.onClientAdd}>Добавить клиента</button>
        </div>
        <div className="mobile__form">
          {
            (this.state.formMode === 1) &&
            <MobileForm key={this.state.clientToEdit.id} btnText='Редактировать' title='Редактировать данные клиента'
                        client={this.state.clientToEdit} formMode={this.state.formMode}/>
          }
          {
            (this.state.formMode === 2) &&
            <MobileForm btnText='Добавить' title='Добавить нового клиента' client={this.state.clientToEdit}
                        formMode={this.state.formMode}/>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    clients: state.clients.clients,
    error: state.clients.error,
    isLoaded: state.clients.isLoaded
  };
};

export default connect(mapStateToProps)(Mobile);