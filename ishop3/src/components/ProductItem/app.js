import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

class ProductItem extends React.Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    picUrl: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
    selectedProduct: PropTypes.string,
    cbTargeted: PropTypes.func.isRequired,
    cbDeleted: PropTypes.func.isRequired,
  };

  static defaultProps = {
    deleteBtn: 'Delete',
    editBtn: 'Edit'
  };

  deleteProduct = (e) => {
    e.stopPropagation();
    this.props.cbDeleted(this.props);
  };

  editProduct = (e) => {
    e.stopPropagation();
    this.props.cbTargeted(this.props.id, 2);
  };

  highlightProduct = () => {
    this.props.cbTargeted(this.props.id, 1);
  };

  render() {

    return (
      <tr className={`product__item ${this.props.id === this.props.selectedProduct ? `highlight` : ``}`}
          onClick={this.highlightProduct}>
        <td className='product__pic'>
          <img src={`img/${this.props.picUrl}`} alt={this.props.name}/>
        </td>
        <td className='product__name'>{this.props.name}</td>
        <td className='product__price'>{this.props.price}</td>
        <td className='product__balance'>{this.props.balance}</td>
        <td className='product__controls'>
          <button className='btn edit-btn' onClick={this.editProduct}>{this.props.editBtn}</button>
          <button className='btn delete-btn' onClick={this.deleteProduct}>{this.props.deleteBtn}</button>
        </td>
      </tr>
    );
  }
}

export default ProductItem;