import React from 'react';
import PropTypes from 'prop-types';

class ClientDetail extends React.PureComponent {

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

  render() {

    return(
      <table className='mobile__clients'>
        <thead>
        <tr>
          <td>Фамилия</td>
          <td>Имя</td>
          <td>Отчетсво</td>
          <td>Баланс</td>
          <td>Статус</td>
        </tr>
        </thead>
        <tbody>
          <tr>
            <td>{this.props.client.surName}</td>
            <td>{this.props.client.name}</td>
            <td>{this.props.client.secondName}</td>
            <td>{this.props.client.balance}</td>
            <td>{this.props.client.status}</td>
          </tr>
        </tbody>
      </table>
    )
  };
}

export default ClientDetail;