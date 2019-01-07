import React from 'react';
import PropTypes from 'prop-types';
import './style.css'

import ProductItem from '../ProductItem/app'
import ProductCard from '../ProductCard/app'

class ProductList extends React.Component {

  static defaultProps = {
    shopName: 'iShop',
    emptyFallbackPhrase: 'No products left',
    editProdTitle: 'Edit existing product',
    addProdTitle: 'Add new product'
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
    cardMode: null // {num} 1 - ProductCard View, 2 - ProductCard Edit, 3 - ProductCard Add
  };

  onProductDelete = (prodToDelete) => {
    if (!confirm(`Вы действительно хотите удалить ${prodToDelete.name}`)) {
      return false;
    }
    const filteredList = this.state.productList.filter((product) => {
      return prodToDelete.id !== product.id
    });
    this.setState({productList: filteredList});
  };

  onProductClick = (productId, cardMode) => {
    this.setState({selectedProduct: this.findSelectedProduct(productId), cardMode: cardMode});
  };

  findSelectedProduct = (productId) => {
    return this.state.productList.find((prod) => {
      return prod.id === productId;
    });
  };

  onProductEdit = (changedProd) => {
    const changedArray = this.state.productList.map((prod) => {
      if (prod.id === changedProd.id) {
        prod = changedProd;
      }
      return prod;
    });

    this.setState({productList: changedArray, cardMode: 1, selectedProduct: changedProd})
  };
  
  addProduct = () => {
    this.setState({cardMode: 3, newProduct: {id: `product_${this.state.productList.length + 1}`}})
  };

  onProductAdd = (product) => {
    const productList = this.state.productList;
    const newProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      picUrl: product.picUrl,
      balance: product.balance
    };
    productList.push(newProduct);
    this.setState({productList: productList, cardMode: null});
  };

  onFormClose = () => {
    this.setState({cardMode: this.state.selectedProduct ? 1 : null})
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
      <div className={`product ${this.state.cardMode === 2 ? `editing` : ``}`}>
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
        <button className={`btn edit-btn ${this.state.cardMode === 2 ? `disabled` : ``}`} type='button' onClick={this.addProduct}>New product</button>
        {
          (this.state.cardMode === 3) &&
          <ProductCard
            title={this.props.addProdTitle}
            product={this.state.newProduct}
            onFormSubmit={this.onProductAdd}
            onFormClose={this.onFormClose}
            cardMode={this.state.cardMode}
          />
        }
        {
          (this.state.cardMode === 2) &&
          <ProductCard
            title={this.props.editProdTitle}
            product={this.state.selectedProduct}
            onFormSubmit={this.onProductEdit}
            onFormClose={this.onFormClose}
            cardMode={this.state.cardMode}
          />
        }
        {
          (this.state.cardMode === 1) &&
          <ProductCard
            title={this.state.selectedProduct.name}
            product={this.state.selectedProduct}
            cardMode={this.state.cardMode}
          />
        }
      </div>
    );
  }
}

export default ProductList;