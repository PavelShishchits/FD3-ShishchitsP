import React from 'react';
import DOM from 'react-dom';
import ProductItem from '../ProductItem/app'
import PropTypes from 'prop-types';
import './style.css'

var ProductList = React.createClass({
  
  displayName: 'ProductList',

  getDefaultProps: function() {
    return {
      shopName: 'iShop',
      emptyFallbackPhrase: 'Товаров больше не осталось'
    }
  },

  getInitialState: function() {
    return {
      productList: this.props.productList,
      selectedProduct: null
    }
  },

  userConfirmation: function(prodToDelete) {
    return confirm(`Вы действительно хотите удалить ${prodToDelete.name}`);
  },

  onProductDelete: function(prodToDelete) {
    if (!this.userConfirmation(prodToDelete)) {
      return false;
    }
    const filteredLis = this.state.productList.filter((product) => {
      return prodToDelete.id !== product.id
    });

    this.setState({productList: filteredLis});
  },

  onProductClick: function(productId) {
    this.setState({selectedProduct: productId})
  },

  propTypes: {
    shopName: PropTypes.string.isRequired,
    propductList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        picUrl: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
        selectedProduct: PropTypes.string
      })
    )
  },
  
  render: function () {

    return DOM.div({className: 'product'},
      DOM.h1({className: 'shopName'}, this.props.shopName),
      DOM.table({className: 'product__table'},
        DOM.tbody(null,
          this.state.productList.length ?
          this.state.productList.map((prod) => {
            return createElement(ProductItem, {
              key: prod.id,
              id: prod.id,
              name: prod.name,
              price: prod.price,
              picUrl: prod.picUrl,
              balance: prod.balance,
              cbSelected: this.onProductClick,
              selectedProduct: this.state.selectedProduct,
              cbDeleted: this.onProductDelete
            })
          })
          : DOM.tr({className: 'product__item product__item--empty'},
            DOM.td({}, this.props.emptyFallbackPhrase)
            )
        )
      )
    )
  }
});

export default ProductList;