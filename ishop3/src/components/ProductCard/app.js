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
    name: 'Please fill the filed. Value must be a string',
    price: 'Please fill the filed. Value must be a positive number',
    balance: 'Please fill the filed. Value must be a positive number',
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

  validateInput = (e) => {
    const target = e.target;
  };

  closeForm = () => {
    this.props.onFormClose();
  };

  state = {
    id: this.props.product.id,
    picUrl: {
      value: '',
      isValid: null,
      errorMessage: ''
    },
    name: {
      value: '',
      isValid: null,
      errorMessage: ''
    },
    price: {
      value: '',
      isValid: null,
      errorMessage: ''
    },
    balance: {
      value: '',
      isValid: null,
      errorMessage: ''
    },
    cardMode: this.props.cardMode
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
            <div className="ProductCard__row">
              <div className='ProductCard__name'>id</div>
              <div className='ProductCard__descr'>{this.state.id}</div>
            </div>
            <div className='ProductCard__row'>
              <div className='ProductCard__name'>picture</div>
              <div className='ProductCard__descr'>
                <input type='file' ref={this.fileInput} onChange={this.inputFileHandler}
                       onBlur={this.validateInput}
                       name='picUrl' required/>
                <div className='controls'>{this.state.picUrl.errorMessage}</div>
              </div>
            </div>
            <div className='ProductCard__row'>
              <div className='ProductCard__name'>name</div>
              <div className='ProductCard__descr'>
                <input type='text' value={this.state.name.value} onChange={this.inputHandler} onBlur={this.validateInput}
                       name='name' required/>
                <div className='controls'>{this.state.name.errorMessage}</div>
              </div>
            </div>
            <div className='ProductCard__row'>
              <div className='ProductCard__name'>price</div>
              <div className='ProductCard__descr'>
                <input type='text' value={this.state.price.value} onChange={this.inputHandler} onBlur={this.validateInput}
                       name='price' required/>
                <div className='controls'>{this.state.price.errorMessage}</div>
              </div>
            </div>
            <div className='ProductCard__row'>
              <div className='ProductCard__name'>balance</div>
              <div className='ProductCard__descr'>
                <input type='text' value={this.state.balance.value} onChange={this.inputHandler} onBlur={this.validateInput}
                       name='balance' required/>
                <div className='controls'>{this.state.balance.errorMessage}</div>
              </div>
            </div>
            <div className='ProductCard__row'>
              <div className="ProductCard__descr">
                <button type='submit' className='btn edit-btn'>Save</button>
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