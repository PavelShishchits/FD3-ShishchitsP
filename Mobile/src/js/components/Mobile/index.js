import React from 'react';
import {connect} from 'react-redux';
import './style.scss';
import isoFetch from 'isomorphic-fetch';

import MobileClient from '../MobileClient/index';
import MobileForm from '../MobileForm/index';
import Filter from '../Filter/index';

import {
  fetchDataSuccess,
  fetchDataFailure,
  VisabilityFiltes,
  setVisabilityFilters,
  onAddClient
} from '../../redux/actions/clientActions';

import {filterList, generateUniqId} from '../../modules/mobile';

class Mobile extends React.PureComponent {

  componentDidMount() {
    this.downloadData();
  }

  fetchError = (error) => {
    this.props.dispatch(fetchDataFailure(error));
  };

  fetchSuccess = (data) => {
    this.props.dispatch(fetchDataSuccess(data));
  };

  // toDo реализовать запрос в actionCreator
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

  onClientAdd = () => {
    this.props.dispatch(onAddClient({id: generateUniqId(this.props.clients), name: '', surName: '', secondName: '', balance: 0, status: ''}, 2));
  };

  renderClients = () => {
    const {error, isLoaded, clients} = this.props;

    const mobileClients = clients.map((client) => {
      return <MobileClient path={this.props.path} key={client.id} client={client}/>
    });

    if (error) {
      return <tr><td>{`Произошла ошибка ${error}`}</td></tr>;
    }

    return !isLoaded ? <tr><td>Загрузка данных...</td></tr> : clients.length ? mobileClients : <tr><td>Клиентов нет</td></tr>;
  };

  render() {

    console.log('Mobile rendered');

    return (
      <div className='mobile'>
        <div className='mobile__filter'>
          {
            <Filter />
          }
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
              this.renderClients()
            }
          </tbody>
        </table>
        <div className='mobile__add'>
          <button className='btn edit-btn add-client' onClick={this.onClientAdd}>Добавить клиента</button>
        </div>
        <div className="mobile__form">
          {
            (this.props.formMode === 1) &&
            <MobileForm key={this.props.clientToEdit.id} btnText='Редактировать' title='Редактировать данные клиента'
                        client={this.props.clientToEdit} formMode={this.props.formMode}/>
          }
          {
            (this.props.formMode === 2) &&
            <MobileForm btnText='Добавить' title='Добавить нового клиента' client={this.props.clientToEdit}
                        formMode={this.props.formMode}/>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = function (store) {
  console.log(store);
  return {
    clients: filterList(store.clients.clients, store.visabilityFilter),
    error: store.clients.error,
    isLoaded: store.clients.isLoaded,
    visabilityFilter: store.visabilityFilter,
    clientToEdit: store.clients.clientToEdit,
    formMode: store.clients.formMode
  };
};

export default connect(mapStateToProps)(Mobile);