import React from 'react';
import PropTypes from 'prop-types';
import './style.css'
import {appEvents} from "../event";

import MobileClient from '../MobileClient/index'

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
    clients: this.props.clients
  };

  componentDidMount() {
    appEvents.addListener('EItemRemove', this.removeClient)
  }

  removeClient = (id) => {
    console.log(id);
  };

  render() {

    console.log('MobileCompany render');
    // console.log(this.props);

    const clients = this.state.clients.map((client) => {
      return <MobileClient key={client.id} client={client}/>
    });

    return (
      <div className='mobile'>
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
          <button className='btn'>Добавить клиента</button>
        </div>
      </div>
    );
  }
}

export default Mobile;