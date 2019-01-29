import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";
import {connect} from 'react-redux';
import './style.scss';

import {removeClient} from '../../redux/actions/clientActions';

class MobileClient extends React.PureComponent {

  static propTypes = {
    // path: PropTypes.string.isRequired,
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
    this.props.dispatch(removeClient(this.props.client.id));
  };

  editItem = () => {
    appEvents.emit('EItemEdit', this.props.client.id);
  };

  render() {
    // console.log(`MobileClient id: ${this.props.client.id} rendered`);

    return (
      <tr>
        <td><NavLink to={`${this.props.path}/client/${this.props.client.id}`}>{this.props.client.surName}</NavLink></td>
        <td>{this.props.client.name}</td>
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

const mapStateToProps = function (state) {
  return {

  };
};

export default connect(mapStateToProps)(MobileClient);