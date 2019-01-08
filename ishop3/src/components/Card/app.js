import React from 'react';
import PropTypes from 'prop-types';
// import './style.css'

class Card extends React.component {

  static propTypes = {
    product: PropTypes.shape({
      picUrl: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      balance: PropTypes.number.isRequired
    }).isRequired
  };

  componentWillReceiveProps = (newProps) => {
    this.setState({product: newProps.product});
  };

  render() {

    return (
      <div className='ProductCard'>
        <div className='ProductCard__title'>{this.props.title}</div>
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