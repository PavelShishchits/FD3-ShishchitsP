import React from 'React';
import PropTypes from 'prop-types';
import './style.css'

class ProductCard extends React.Component {

  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }

  static defaultProps = {
    picError: 'Download an image',
    nameError: 'Please fill the filed. Value must be a string',
    priceError: 'Please fill the filed. Value must be a positive number',
    balanceError: 'Please fill the filed. Value must be a positive number',
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
    product: PropTypes.shape({
      id: PropTypes.string,
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
    const {id, picUrl, name, price, balance} = this.state;
    this.props.onFormSubmit({id, picUrl: picUrl.value, name: name.value, price: price.value, balance: balance.value});
  };

  inputHandler = (e) => {
    const target = e.target;
    this.setState({
      [target.name]: {...this.state[target.name], value: target.value}
    });
  };

  inputFileHandler = () => {
    const inpFile = this.fileInput.current;
    const fileReader = new FileReader();

    fileReader.addEventListener('load', () => {
      if (fileReader.readyState === 2) {
        this.setState({'picUrl': {...this.state.picUrl, value: fileReader.result}})
      }
    });

    fileReader.readAsDataURL(inpFile.files[0]);
  };

  validateNumber = (num) => {
    if (isNaN(num)) {
      return false;
    }
    return parseInt(num);
  };

  validateInput = (e) => {
    const target = e.target;

    switch (target.name) {
      case 'name':
        this.setState({name: {...this.state.name, isValid: target.value.length >= 1}});
        break;
      case 'price':
        this.setState({price: {...this.state.price, isValid: target.value.length >= 1, value: this.validateNumber(target.value)}});
        break;
      case 'balance':
        this.setState({balance: {...this.state.balance, isValid: target.value.length >= 1, value: this.validateNumber(target.value)}});
        break;
    }
  };

  closeForm = () => {
    this.props.onFormClose();
  };

  state = {
    id: this.props.product.id,
    picUrl: {
      value: '',
      isValid: null,
      errorMessage: this.props.picError
    },
    name: {
      value: '',
      isValid: null,
      errorMessage: this.props.nameError
    },
    price: {
      value: '',
      isValid: null,
      errorMessage: this.props.priceError
    },
    balance: {
      value: '',
      isValid: null,
      errorMessage: this.props.balaceError
    },
    cardMode: this.props.cardMode,
    formValid: null
  };

  componentWillReceiveProps = (newProps) => {
    this.setState({cardMode: newProps.cardMode, id: newProps.product.id});
  };

  render() {

    return (
      this.state.cardMode === 2 || this.state.cardMode === 3
        ?
        <form className='ProductCard' onSubmit={this.submitForm}>
          <div className='ProductCard__title'>{this.props.title}</div>
          <div className='ProductCard__inner'>
            <div className='ProductCard__row'>
              <div className='ProductCard__name'>id</div>
              <div className='ProductCard__descr'>{this.state.id}</div>
            </div>
            <div className={`ProductCard__row ${this.state.picUrl.isValid === false ? `error` : this.state.picUrl.isValid === true ? `success` : ``}`}>
              <div className='ProductCard__name'>picture</div>
              <div className='ProductCard__descr'>
                <div className="ProductCard__input-wrap">
                  <input type='file' ref={this.fileInput} onChange={this.inputFileHandler}
                         onBlur={this.validateInput}
                         name='picUrl' required/>
                </div>
                <div className='controls'>{this.state.picUrl.errorMessage}</div>
              </div>
            </div>
            <div className={`ProductCard__row ${this.state.name.isValid === false ? `error` : this.state.name.isValid === true ? `success` : ``}`}>
              <div className='ProductCard__name'>name</div>
              <div className='ProductCard__descr'>
                <div className="ProductCard__input-wrap">
                  <input type='text' value={this.state.name.value} onChange={this.inputHandler} onBlur={this.validateInput}
                         name='name' required/>
                </div>
                <div className='controls'>{this.state.name.errorMessage}</div>
              </div>
            </div>
            <div className={`ProductCard__row ${this.state.price.isValid === false ? `error` : this.state.price.isValid === true ? `success` : ``}`}>
              <div className='ProductCard__name'>price</div>
              <div className='ProductCard__descr'>
                <div className="ProductCard__input-wrap">
                  <input type='text' value={this.state.price.value} onChange={this.inputHandler} onBlur={this.validateInput}
                         name='price' required/>
                </div>
                <div className='controls'>{this.state.price.errorMessage}</div>
              </div>
            </div>
            <div className={`ProductCard__row ${this.state.balance.isValid === false ? `error` : this.state.balance.isValid === true ? `success` : ``}`}>
              <div className='ProductCard__name'>balance</div>
              <div className='ProductCard__descr'>
                <div className="ProductCard__input-wrap">
                  <input type='text' value={this.state.balance.value} onChange={this.inputHandler} onBlur={this.validateInput}
                         name='balance' required/>
                </div>
                <div className='controls'>{this.state.balance.errorMessage}</div>
              </div>
            </div>
            <div className='ProductCard__row'>
              <div className="ProductCard__descr">
                <button type='submit' className={`btn edit-btn ${this.state.formValid === false ? `disabled` : ``}`}>Save</button>
                <button className='btn delete-btn' onClick={this.closeForm}>Cancel</button>
              </div>
            </div>
          </div>
        </form>
        :
        <div className='ProductCard'>
          <div className='ProductCard__title'>{this.props.product.name}</div>
          <div className='ProductCard__inner'>
            <div className='ProductCard__row'>
              <div className='ProductCard__name'>picture</div>
              <div className='ProductCard__descr'>
                <img src={this.props.product.picUrl} alt={this.props.product.name}/>
              </div>
            </div>
            <div className='ProductCard__row'>
              <div className='ProductCard__name'>name</div>
              <div className='ProductCard__descr'>{this.props.product.name}</div>
            </div>
            <div className='ProductCard__row'>
              <div className='ProductCard__name'>price</div>
              <div className='ProductCard__descr'>{this.props.product.price}</div>
            </div>
            <div className='ProductCard__row'>
              <div className='ProductCard__name'>balance</div>
              <div className='ProductCard__descr'>{this.props.product.balance}</div>
            </div>
          </div>
        </div>
    )
  }
}

export default ProductCard;