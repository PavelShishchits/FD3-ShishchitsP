import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import {appEvents} from '../event';

class MobileForm extends React.PureComponent {

  constructor(props) {
    super();
    this.inputs = {
      surName: null,
      name: null,
      secondName: null,
      balance: null
    };
    this.state = {
      formMode: props.formMode
    };
  }

  static proptypes = {
    btnText: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    client: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      surName: PropTypes.string.isRequired,
      secondName: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired
    }).isRequired,
    formMode: PropTypes.number.isRequired
  };

  componentDidMount() {
    console.log('componentDidMount MobileForm');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate MobileForm');
  }

  submitForm = (e) => {
    e.preventDefault();
    const {surName, name, secondName, balance} = this.inputs;
    if (this.state.formMode === 1) {
      appEvents.emit('EEditClient', {id: this.props.client.id, surName: surName.value, name: name.value, secondName: secondName.value, balance: parseInt(balance.value), status: this.calcClientStatus(balance.value)});
    } else {
      appEvents.emit('EAddClient', {id: this.props.client.id, surName: surName.value, name: name.value, secondName: secondName.value, balance: parseInt(balance.value), status: this.calcClientStatus(balance.value)});
    }
  };

  calcClientStatus = (balance) => balance >= 0 ? 1 : 0;

  closeForm = () => {
    appEvents.emit('ECloseForm', 0)
  };

  setInput = (element) => {
    if (element) {
      this.inputs[element.name] = element;
    }
  };

  render() {

    console.log('MobileForm render');

    return (
      <form className='mForm' onSubmit={this.submitForm}>
        <div className="mForm__title">{this.props.title}</div>
        <div className="mForm__row">
          <div className="mForm__cell-name">
            <label htmlFor='id'>Id</label>
          </div>
          <div className="mForm__cell-value">
            {this.props.client.id}
          </div>
        </div>
        <div className="mForm__row">
          <div className="mForm__cell-name">
            <label htmlFor='id'>Фамилия</label>
          </div>
          <div className="mForm__cell-value">
            <input type="text" id='surName' ref={this.setInput} name='surName' defaultValue={this.props.client.surName} required/>
          </div>
        </div>
        <div className="mForm__row">
          <div className="mForm__cell-name">
            <label htmlFor='id'>Имя</label>
          </div>
          <div className="mForm__cell-value">
            <input type="text" id='name' name='name' ref={this.setInput} defaultValue={this.props.client.name} readOnly={this.props.formMode === 1} required/>
          </div>
        </div>
        <div className="mForm__row">
          <div className="mForm__cell-name">
            <label htmlFor='id'>Отчество</label>
          </div>
          <div className="mForm__cell-value">
            <input type="text" id='secondName' name='secondName' ref={this.setInput} defaultValue={this.props.client.secondName} readOnly={this.props.formMode === 1} required/>
          </div>
        </div>
        <div className="mForm__row">
          <div className="mForm__cell-name">
            <label htmlFor='id'>Баланс</label>
          </div>
          <div className="mForm__cell-value">
            <input type="text" id='balance' name='balance' ref={this.setInput} defaultValue={this.props.client.balance} required/>
          </div>
        </div>
        <div className="mForm__btn-wrap">
          <button className='btn edit-btn' type='submit'>{this.props.btnText}</button>
          <button className='btn delete-btn' type='reset' onClick={this.closeForm}>Отмена</button>
        </div>
      </form>
    )
  }
}

export default MobileForm;