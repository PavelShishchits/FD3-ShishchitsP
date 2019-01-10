import React from 'react';
import PropTypes from 'prop-types';
import './style.css'
import utils from '../../utlls'

class Card extends React.Component {

  constructor(props) {
    super(props);
    this.inputFile = null;
    this.state = {
      id: this.props.product.id,
      picUrl: {
        value: this.props.product.picUrl,
        isValid: null,
        errorMessage: ''
      },
      name: {
        value: this.props.product.name,
        isValid: null,
        errorMessage: ''
      },
      price: {
        value: this.props.product.price,
        isValid: null,
        errorMessage: ''
      },
      balance: {
        value: this.props.product.balance,
        isValid: null,
        errorMessage: ''
      },
      cardMode: this.props.cardMode,
      isValidForm: null,
      validFileds: {
        picUrl: null,
        name: null,
        price: null,
        balance: null
      }
    }
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    btnText: PropTypes.string,
    product: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      price: PropTypes.number,
      picUrl: PropTypes.string,
      balance: PropTypes.number,
    }),
    onProductEdit: PropTypes.func,
    onProdcutAdd: PropTypes.func,
    onFormClose: PropTypes.func,
    cardMode: PropTypes.number
  };

  submitForm = (e) => {
    e.preventDefault();
    // console.log(this.validateForm());
    if (this.validateForm()) {
      const {id, picUrl, name, price, balance} = this.state;
      this.props.onFormSubmit({id, picUrl: picUrl.value, name: name.value, price: price.value, balance: balance.value});
    }
  };

  inputHandler = (e) => {
    const target = e.target;
    this.setState({
      [target.name]: {...this.state[target.name], value: target.value}
    });
  };

  setInputFile = (element) => {
    this.inputFile = element;
  };

  inputFileHandler = () => {
    const inpFile = this.inputFile;
    const file = inpFile.files[0];
    if (!utils.checkFileInput(['image/jpeg', 'image/png', 'image/gif'], file['type'])) {
      this.setState({'picUrl': {...this.state.picUrl, isValid: false, errorMessage: `Wrong file format, Download jpeg, png or gif file`}});
      return false;
    } else {
      this.setState({'picUrl': {...this.state.picUrl, isValid: true, errorMessage: ``}});
    }

    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      if (fileReader.readyState === 2) {
        this.setState({'picUrl': {...this.state.picUrl, value: fileReader.result}})
      }
    });

    fileReader.readAsDataURL(file);
  };

  onInputBlur = (e) => {
    this.validateInput(e.target.name);
  };

  validateForm = () => {
    return Object.keys(this.state.validFileds).reduce((state, fieldName) => {
      state = this.validateInput(fieldName);
      return state;
    }, null);
  };

  validateInput = (name) => {
    let field = this.state[name];
    let validFileds = this.state.validFileds;
    let isValidForm = null;

    switch (name) {
      case 'picUrl':
        field = utils.validateTextInput(field, 5);
        break;
      case 'name':
        field = utils.validateTextInput(field, 5, 50);
        break;
      case 'price':
        field = utils.validateNumberInput(field);
        break;
      case 'balance':
        field = utils.validateNumberInput(field);
        break;
    }

    let {isValid} = field;
    validFileds[name] = isValid;
    isValidForm = Object.keys(validFileds).some((fieldName) => {
      return validFileds[fieldName] === false;
    });
    this.setState({[name]: field, validFileds, isValidForm: !isValidForm});
    return !isValidForm;
  };

  closeForm = () => {
    this.props.onFormClose();
  };

  componentWillReceiveProps = (newProps) => {
    this.setState({cardMode: newProps.cardMode, id: newProps.product.id});
  };

  render() {

    return (
      this.state.cardMode === 2 || this.state.cardMode === 3
        ?
        <form className={`card ${this.state.cardMode === 2 || this.state.cardMode === 3 ? `form-view` : ``}`} onSubmit={this.submitForm}>
          <div className='card__title'>{this.props.title}</div>
          <div className='card__inner'>
            <div className='card__row'>
              <div className='card__name'>id</div>
              <div className='card__descr'>{this.state.id}</div>
            </div>
            <div className={`card__row ${this.state.picUrl.isValid === false ? `error` : this.state.picUrl.isValid === true ? `success` : ``}`}>
              <div className='card__name'><label htmlFor='picUrl'>picture</label></div>
              <div className='card__descr'>
                <div className="card__input-wrap file-wrap">
                  <input type='text' id='picUrl' readOnly={true} value={this.state.picUrl.value} onChange={this.inputHandler} onBlur={this.onInputBlur}
                         name='picUrl'/>
                  <label htmlFor='file' className='card__file'>
                    <input type='file' ref={this.setInputFile} onChange={this.inputFileHandler} name='file'/>
                    <div className='file-icon'>
                      <img src='img/download.svg' alt='download-icon'/>
                    </div>
                  </label>
                </div>
                <div className='controls'>{this.state.picUrl.errorMessage}</div>
              </div>
            </div>
            <div className={`card__row ${this.state.name.isValid === false ? `error` : this.state.name.isValid === true ? `success` : ``}`}>
              <div className='card__name'><label htmlFor='name'>name</label></div>
              <div className='card__descr'>
                <div className="card__input-wrap">
                  <input type='text' id='name' value={this.state.name.value} onChange={this.inputHandler} onBlur={this.onInputBlur}
                         name='name'/>
                </div>
                <div className='controls'>{this.state.name.errorMessage}</div>
              </div>
            </div>
            <div className={`card__row ${this.state.price.isValid === false ? `error` : this.state.price.isValid === true ? `success` : ``}`}>
              <div className='card__name'><label htmlFor='price'>price</label></div>
              <div className='card__descr'>
                <div className="card__input-wrap">
                  <input type='text' id='price' value={this.state.price.value} onChange={this.inputHandler} onBlur={this.onInputBlur}
                         name='price'/>
                </div>
                <div className='controls'>{this.state.price.errorMessage}</div>
              </div>
            </div>
            <div className={`card__row ${this.state.balance.isValid === false ? `error` : this.state.balance.isValid === true ? `success` : ``}`}>
              <div className='card__name'><label htmlFor='balance'>balance</label></div>
              <div className='card__descr'>
                <div className="card__input-wrap">
                  <input type='text' id='balance' value={this.state.balance.value} onChange={this.inputHandler} onBlur={this.onInputBlur}
                         name='balance'/>
                </div>
                <div className='controls'>{this.state.balance.errorMessage}</div>
              </div>
            </div>
            <div className='card__row'>
              <div className="card__descr">
                <button type='submit' className={`btn edit-btn ${this.state.isValidForm === false ? `disabled` : ``}`}>{this.props.btnText}</button>
                <button className='btn delete-btn' onClick={this.closeForm}>Cancel</button>
              </div>
            </div>
          </div>
        </form>
        :
        <div className='card'>
          <div className='card__title'>{this.props.product.name}</div>
          <div className='card__inner'>
            <div className='card__row'>
              <div className='card__name'>picture</div>
              <div className='card__descr'>
                <img src={this.props.product.picUrl} alt={this.props.product.name}/>
              </div>
            </div>
            <div className='card__row'>
              <div className='card__name'>name</div>
              <div className='card__descr'>{this.props.product.name}</div>
            </div>
            <div className='card__row'>
              <div className='card__name'>price</div>
              <div className='card__descr'>{this.props.product.price}</div>
            </div>
            <div className='card__row'>
              <div className='card__name'>balance</div>
              <div className='card__descr'>{this.props.product.balance}</div>
            </div>
          </div>
        </div>
    )
  }
}

export default Card;