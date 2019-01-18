import React from 'react';
import PropTypes from 'prop-types';
import './style.css'
import {appEvents} from "../event";

class MobileClient extends React.PureComponent {

  constructor() {
    super();
  }

  static propTypes = {
    client: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      surName: PropTypes.string.isRequired,
      secondName: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
      status: PropTypes.number.isRequired // 0 - неактивен, 1 - активен
    }).isRequired
  };

  removeItem = () => {
    appEvents.emit('EItemRemove', this.props.client.id);
  };

  editItem = () => {
    appEvents.emit('EItemEdit', this.props.client.id);
  };

  render() {
    console.log('MobileClient rendered');

    return (
      <tr>
        <td>{this.props.client.name}</td>
        <td>{this.props.client.surName}</td>
        <td>{this.props.client.secondName}</td>
        <td>{this.props.client.balance}</td>
        <td className={this.props.client.status === 0 ? 'unavail' : 'avail'}>{this.props.client.status === 0 ? `Неактивен` : `Активен`}</td>
        <td>
          <button className='btn edit-btn' onClick={this.editItem}>Редактировать</button>
          <button className='btn delete-btn' onClick={this.removeItem}>Удалить</button>
        </td>
      </tr>
    )
  }
}

export default MobileClient;