import React from 'React';
import PropTypes from 'prop-types';
import './style.css'

class ProductCard extends React.Component {

  static defaultProps = {
    title: 'Product card'
  };

  static propTypes = {
    product: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      picUrl: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
    }),
    onProductEdit: PropTypes.func.isRequired,
    onProdcutAdd: PropTypes.func.isRequired,
    cardMode: PropTypes.number
  };

  submitForm = (e) => {
    e.preventDefault();
    const {id, picUrl, name, price, balance} = this.state;
    if (this.state.cardMode === 2) {
      this.props.onProductEdit({id, picUrl, name, price, balance});
    } else if (this.state.cardMode === 3) (
      this.props.onProdcutAdd({id, picUrl, name, price, balance})
    )
  };

  inputHandler = (e) => {
    const target = e.target;
    this.setState({
      [target.name]: target.value
    });
  };

  validateInput = (e) => {
    const target = e.target;
  };

  state = {
    id: this.props.product.id,
    picUrl: '',
    name: '',
    price: '',
    balance: '',
    cardMode: this.props.cardMode
  };

  componentWillReceiveProps = (newProps) => {
    this.setState({cardMode: newProps.cardMode});
  };

  render() {

    return (
      this.state.cardMode === 2 || this.state.cardMode === 3
        ?
        <form className='ProductCard' onSubmit={this.submitForm}>
          <div className='ProductCard__title'>{this.props.title}</div>
          <div className='ProductCard__inner'>
            <div className='ProductCard__row'>
              <div className='ProductCard__name'>picture url</div>
              <div className='ProductCard__descr'>
                <input type='text' value={this.state.picUrl} onChange={this.inputHandler} onBlur={this.validateInput}
                       name='picUrl' required/>
              </div>
            </div>
            <div className='ProductCard__row'>
              <div className='ProductCard__name'>name</div>
              <div className='ProductCard__descr'>
                <input type='text' value={this.state.name} onChange={this.inputHandler} onBlur={this.validateInput}
                       name='name' required/>
              </div>
            </div>
            <div className='ProductCard__row'>
              <div className='ProductCard__name'>price</div>
              <div className='ProductCard__descr'>
                <input type='text' value={this.state.price} onChange={this.inputHandler} onBlur={this.validateInput}
                       name='price' required/>
              </div>
            </div>
            <div className='ProductCard__row'>
              <div className='ProductCard__name'>balance</div>
              <div className='ProductCard__descr'>
                <input type='text' value={this.state.balance} onChange={this.inputHandler} onBlur={this.validateInput}
                       name='balance' required/>
              </div>
            </div>
            <div className='ProductCard__btn-wrap'>
              <button type='submit' className='btn edit-btn'>Save</button>
              <button className='btn delete-btn-btn'>Cancel</button>
            </div>
          </div>
        </form>
        :
        <div className='ProductCard'>
          <div className='ProductCard__title'>{this.props.product.title}</div>
          <div className='ProductCard__inner'>
            <div className='ProductCard__row'>
              <div className='ProductCard__name'>picture url</div>
              <div className='ProductCard__descr'>{this.props.product.picUrl}</div>
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