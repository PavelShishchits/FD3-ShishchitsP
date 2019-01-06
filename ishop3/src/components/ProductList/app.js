import React from 'react';
import PropTypes from 'prop-types';
import './style.css'

import ProductItem from '../ProductItem/app'
import ProductCard from '../ProductCard/app'

class ProductList extends React.Component {

  static defaultProps = {
    shopName: 'iShop',
    emptyFallbackPhrase: 'Товаров больше не осталось'
  };

  static propTypes = {
    shopName: PropTypes.string.isRequired,
    propductList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        picUrl: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
      })
    ),
    selectedProduct: PropTypes.object
  };

  state = {
    productList: this.props.productList,
    selectedProduct: null,
    workMode: null
  };

  userConfirmation = (prodToDelete) => {
    return confirm(`Вы действительно хотите удалить ${prodToDelete.name}`);
  };

  onProductDelete = (prodToDelete) => {
    if (!this.userConfirmation(prodToDelete)) {
      return false;
    }
    const filteredList = this.state.productList.filter((product) => {
      return prodToDelete.id !== product.id
    });
    this.setState({productList: filteredList});
  };

  onProductClick = (productId, workmode) => {
    this.setState({selectedProduct: this.findSelectedProduct(productId), workMode: workmode});
  };

  findSelectedProduct = (productId) => {
    return this.state.productList.find((prod) => {
      return prod.id === productId;
    });
  };

  productEdit = (changedProd) => {
    const changedArray = this.state.productList.map((prod) => {
      if (prod.id === changedProd.id) {
        prod = changedProd;
      }

      return prod;
    });

    this.setState({productList: changedArray}, () => {

    })
  };

  render() {

    const products = this.state.productList.map((prod) => {
      return <ProductItem
        key={prod.id}
        name={prod.name}
        price={prod.price}
        picUrl={prod.picUrl}
        balance={prod.balance}
        id={prod.id}
        cbTargeted={this.onProductClick}
        selectedProduct={this.state.selectedProduct ? this.state.selectedProduct.id : null}
        cbDeleted={this.onProductDelete}
      />
    });

    return (
      <div className='product'>
        <h1 className='shopName'>{this.props.shopName}</h1>
        <table className='product__table'>
          <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Price</th>
            <th>Balance</th>
            <th>Controls</th>
          </tr>
          </thead>
          <tbody>
          {
            this.state.productList.length
              ?
              products
              :
              <tr className='product__item product__item--empty'>
                <td>{this.props.emptyFallbackPhrase}</td>
              </tr>
          }
          </tbody>
        </table>

        {
          (this.state.workMode) &&
          <ProductCard
            name={this.state.selectedProduct.name}
            price={this.state.selectedProduct.price}
            picUrl={this.state.selectedProduct.picUrl}
            balance={this.state.selectedProduct.balance}
            id={this.state.selectedProduct.id}
            workMode={this.state.workMode}
            onProductEdit={this.productEdit}
          />
        }
      </div>
    );
  }
}

export default ProductList;