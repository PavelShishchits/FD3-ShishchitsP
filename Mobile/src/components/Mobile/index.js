import React from 'react';
import PropTypes from 'prop-types';
import './style.css'
import {appEvents} from "../event";

import MobileClient from '../MobileClient/index'
import MobileForm from '../MobileForm/index'

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
    formMode: 0, // 1 - форма редактирования, 2 - форма добавления,
    clientToEdit: null,
    currentCompany: this.props.currCompanyName
  };

  componentDidMount() {
    appEvents.addListener('EItemRemove', this.onClientRemove);
    appEvents.addListener('EItemEdit', this.onClientEdit);
    appEvents.addListener('EEditClient', this.editClient);
    appEvents.addListener('EAddClient', this.addClient);
    appEvents.addListener('ECloseForm', this.closeForm);
  }

  componentWillUnmount() {
    appEvents.removeListener('EitemRemove', this.onClientRemove);
    appEvents.removeListener('EItemEdit', this.onClientEdit);
    appEvents.removeListener('EEditClient', this.editClient);
    appEvents.removeListener('EAddClient', this.addClient);
    appEvents.removeListener('ECloseForm', this.closeForm);
  }

  // forms
  editClient = (editedClient) => {
    console.log('cleintEditted');
    this.setState({clients: this.state.clients.map((client) => {
        if (client.id === editedClient.id) {
          client = editedClient;
        }
        return client;
      }), formMode: 0});
  };

  addClient = (client) => {
    console.log('clientAdded');
    this.setState({clients: [...this.state.clients, client], formMode: 0});
  };

  onClientRemove = (id) => {
    this.setState({clients: this.state.clients.filter((client) => {
        if (client.id !== id) {
          return client
        }
      })});
  };

  onClientEdit = (id) => {
    this.setState({formMode: 1, clientToEdit: this.state.clients.find((client) => client.id === id)});
  };

  onClientAdd = () => {
    const id = this.state.clients[this.state.clients.length - 1].id + 1;
    this.setState({formMode: 2, clientToEdit: {id: id, name: '', surName: '', secondName: '', balance: 0, status: ''}})
  };

  closeForm = (formMode) => {
    this.setState({formMode: formMode});
  };

  // end of forms

  changeCompanyName = (e) => {
    this.setState({currentCompany: e.target.value})
  };

  filterList = (e) => {
    let clients = this.props.clients;
    switch (e.target.value) {
      case 'all':
        // this.setState({clients: this.s})
        break;
      case 'active':
        clients = clients.filter((client) => client.status === 1);
        break;
      case 'unavail':
        clients = clients.filter((client) => client.status === 0);
        break;
    }
    this.setState({clients: clients})
  };

  render() {

    console.log('MobileCompany render');

    const clients = this.state.clients.map((client) => {
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
          <button className='btn' value='all' onClick={this.filterList}>Все</button>
          <button className='btn' value='active' onClick={this.filterList}>Активные</button>
          <button className='btn' value='unavail' onClick={this.filterList}>Заблокированные</button>
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
              clients
            }
          </tbody>
        </table>
        <div className='mobile__add'>
          <button className='btn edit-btn' onClick={this.onClientAdd}>Добавить клиента</button>
        </div>
        <div className="mobile__form">
          {
            (this.state.formMode === 1) &&
            <MobileForm key={this.state.clientToEdit.id} btnText='Редактировать' title='Редактировать данные клиента' client={this.state.clientToEdit} formMode={this.state.formMode}/>
          }
          {
            (this.state.formMode === 2) &&
            <MobileForm btnText='Добавить' title='Добавить нового клиента' client={this.state.clientToEdit} formMode={this.state.formMode}/>
          }
        </div>
      </div>
    );
  }
}

export default Mobile;