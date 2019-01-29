import React from 'react';
import {connect} from 'react-redux';
// import PropTypes from 'prop-types';
import './style.scss';
import isoFetch from 'isomorphic-fetch';
// import { appEvents } from '../event';

import MobileClient from '../MobileClient/index';
import MobileForm from '../MobileForm/index';

import * as mModules from '../../modules/mobile';

import {
  fetchDataSuccess,
  fetchDataFailure,
  VisabilityFiltes,
  setVisabilityFilters
} from '../../redux/actions/clientActions';


class Mobile extends React.PureComponent {

  state = {
    clients: [],
    isLoaded: false,
    formMode: 0, // 1 - форма редактирования, 2 - форма добавления,
    clientToEdit: null
  };

  componentDidMount() {
    this.downloadData();
    // appEvents.addListener('EItemEdit', this.onClientEdit);
    // appEvents.addListener('EEditClient', this.editClient);
    // appEvents.addListener('EAddClient', this.addClient);
    // appEvents.addListener('ECloseForm', this.closeForm);
  }

  componentWillUnmount() {
    // appEvents.removeListener('EItemEdit', this.onClientEdit);
    // appEvents.removeListener('EEditClient', this.editClient);
    // appEvents.removeListener('EAddClient', this.addClient);
    // appEvents.removeListener('ECloseForm', this.closeForm);
  }

  componentWillReceiveProps = (nextProps, nextContext) => {
    this.setState({clients: nextProps.clients, isLoaded: nextProps.isLoaded, formMode: nextProps.formMode});
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
      formMode: 0,
      clientToEdit: null
    });
  };

  addClient = (client) => {
    const addedClients = mModules.addClient(this.state.clients, client);
    this.setState({
      clients: addedClients,
      formMode: 0,
      clientToEdit: null
    });
  };

  removeClient = (id) => {
    const clients = mModules.removeClient(this.state.clients, id);
    this.setState({clients: clients, formMode: 0});
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

  onFilterClick = (e) => {
    const type = e.target.value;
    this.props.dispatch(setVisabilityFilters(type));
  };

  render() {

    const clients = this.state.clients.map((client) => {
      return <MobileClient path={this.props.path} key={client.id} client={client}/>
    });

    return (

      <div className='mobile'>
        <div className='mobile__filter'>
          <button className='btn filter-all' value={VisabilityFiltes.SHOW_ALL} onClick={this.onFilterClick}>Все</button>
          <button className='btn filter-active' value={VisabilityFiltes.SHOW_ACTIVE} onClick={this.onFilterClick}>Активные</button>
          <button className='btn filter-unavail' value={VisabilityFiltes.SHOW_UNACTiVE} onClick={this.onFilterClick}>Заблокированные</button>
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
            !this.state.isLoaded ?
            <tr><td>Загрузка данных...</td></tr>
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
            <MobileForm key={this.props.clientToEdit.id} btnText='Редактировать' title='Редактировать данные клиента'
                        client={this.props.clientToEdit} formMode={this.props.formMode}/>
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
// toDo где сторить эту функцию???
const getFilteredList = (arr, filter) => {
  switch (filter) {
    case VisabilityFiltes.SHOW_ALL:
      return arr;
    case VisabilityFiltes.SHOW_ACTIVE:
      return arr.filter((item) => item.status === 1);
    case VisabilityFiltes.SHOW_UNACTiVE:
      return arr.filter((item) => item.status === 0);
    default:
      return arr;
  }
};

const mapStateToProps = function (state) {
  // console.log(state);
  return {
    clients: getFilteredList(state.clients.clients, state.visabilityFilter),
    error: state.clients.error,
    isLoaded: state.clients.isLoaded,
    visabilityFilter: state.visabilityFilter,
    clientToEdit: state.clients.clientToEdit,
    formMode: state.clients.formMode
  };
};

export default connect(mapStateToProps)(Mobile);