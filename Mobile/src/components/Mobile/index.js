import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import {appEvents} from '../event';

import MobileClient from '../MobileClient/index';
import MobileForm from '../MobileForm/index';

import * as mModules from '../../modules/mobile';

class Mobile extends React.PureComponent {

  static propTypes = {
    currCompanyName: PropTypes.string.isRequired,
    clients: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        surName: PropTypes.string.isRequired,
        secondName: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
        status: PropTypes.number.isRequired // 0 - неактивен, 1 - активен
      }).isRequired
    ).isRequired
  };

  state = {
    clients: this.props.clients,
    filteredClients: this.props.clients,
    formMode: 0, // 1 - форма редактирования, 2 - форма добавления,
    clientToEdit: null,
    currentCompany: this.props.currCompanyName,
    filterMod: 'all'
  };

  componentDidMount() {
    appEvents.addListener('EItemRemove', this.removeClient);
    appEvents.addListener('EItemEdit', this.onClientEdit);
    appEvents.addListener('EEditClient', this.editClient);
    appEvents.addListener('EAddClient', this.addClient);
    appEvents.addListener('ECloseForm', this.closeForm);
  }

  componentWillUnmount() {
    appEvents.removeListener('EitemRemove', this.removeClient);
    appEvents.removeListener('EItemEdit', this.onClientEdit);
    appEvents.removeListener('EEditClient', this.editClient);
    appEvents.removeListener('EAddClient', this.addClient);
    appEvents.removeListener('ECloseForm', this.closeForm);
  }

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

  changeCompanyName = (e) => {
    this.setState({currentCompany: e.target.value})
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

    // console.log('MobileCompany render');

    const clients = this.state.filteredClients.map((client) => {
      return <MobileClient key={client.id} client={client}/>
    });

    return (
      <div className='mobile container'>
        <div className="mobile__name">{this.state.currentCompany}</div>
        <div className='mobile__btn-wrap'>
          <button className='btn' value='Velcom' onClick={this.changeCompanyName}>Velcom</button>
          <button className='btn' value='Mts' onClick={this.changeCompanyName}>Mts</button>
        </div>
        <div className='mobile__filter'>
          <button className='btn' value='all' onClick={this.onFilterClick}>Все</button>
          <button className='btn' value='active' onClick={this.onFilterClick}>Активные</button>
          <button className='btn' value='unavail' onClick={this.onFilterClick}>Заблокированные</button>
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
            this.state.filteredClients.length ?
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

export default Mobile;