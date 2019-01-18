import React from 'react';
import PropTypes from 'prop-types';
import './style.css'
import {appEvents} from "../event";

import MobileClient from '../MobileClient/index'
import MobileForm from '../MobileForm/index'

class Mobile extends React.PureComponent {

  static propTypes = {
    clients: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        surName: PropTypes.string.isRequired,
        secondName: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
        status: PropTypes.number.isRequired // 0 - неактивен, 1 - активен
      })
    )
  };

  state = {
    clients: this.props.clients,
    formMode: 0, // 1 - форма редактирования, 2 - форма добавления,
    clientToEdit: null
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

  editClient = (editedClient) => {
    console.log('cleintEditted');
    this.setState({clients: this.state.clients.map((client) => {
        if (client.id === editedClient.id) {
          client = editedClient;
        }
        return client;
      })});
  };

  addClient = (client) => {
    console.log('clientAdded');
    this.setState({clients: [...this.state.clients, client]});
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

  render() {

    console.log('MobileCompany render');

    const clients = this.state.clients.map((client) => {
      return <MobileClient key={client.id} client={client}/>
    });

    return (
      <div className='mobile container'>
        <div className='mobile__btn-wrap'>
          <button className='btn'>Velcom</button>
          <button className='btn'>Mts</button>
        </div>
        <div className='mobile__filter'>
          <button className='btn'>Все</button>
          <button className='btn'>Активные</button>
          <button className='btn'>Заблокированные</button>
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