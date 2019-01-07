import React from 'React';
import PropTypes from 'prop-types';
import './style.css'

class ProductCard extends React.Component {

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
    this.props.onFormSubmit({id, picUrl, name, price, balance});
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

  closeForm = () => {
    this.props.onFormClose();
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
              <button className='btn delete-btn' onClick={this.closeForm}>Cancel</button>
            </div>
          </div>
        </form>
        :
        <div className='ProductCard'>
          <div className='ProductCard__title'>{this.props.title}</div>
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