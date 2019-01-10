import React from 'react';
import PropTypes from 'prop-types';
import './style.css'

import ProductItem from '../ProductItem/app'
import Card from '../Card/app'

class ProductList extends React.Component {

  static defaultProps = {
    shopName: 'iShop',
    emptyFallbackPhrase: 'No products left',
  };

  static propTypes = {
    shopName: PropTypes.string.isRequired,
    propductList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
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
    newProduct: null,
    cardMode: null // {num} 1 - Card View, 2 - Card Edit, 3 - Card Add
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
    const id = this.state.productList[this.state.productList.length - 1].id + 1;
    this.setState({cardMode: 3, newProduct: {id: id, picUrl: '', name: '', price: 0, balance: 0}})
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
    this.setState({productList: productList, cardMode: 1, selectedProduct: newProduct});
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
        selectedProductID={this.state.selectedProduct ? this.state.selectedProduct.id : null}
        cbDeleted={this.onProductDelete}
      />
    });

    return (
      <div className={`product ${this.state.cardMode === 2 || this.state.cardMode === 3 ? `editing` : ``}`}>
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
          <Card
            title='Add new product'
            btnText='Add'
            product={this.state.newProduct}
            onFormSubmit={this.onProductAdd}
            onFormClose={this.onFormClose}
            cardMode={this.state.cardMode}
            validForm={false}
          />
        }
        {
          (this.state.cardMode === 2) &&
          <Card
            title='Edit existing product'
            btnText='Save'
            product={this.state.selectedProduct}
            onFormSubmit={this.onProductEdit}
            onFormClose={this.onFormClose}
            cardMode={this.state.cardMode}
            validForm={true}
          />
        }
        {
          (this.state.cardMode === 1) &&
          <Card
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