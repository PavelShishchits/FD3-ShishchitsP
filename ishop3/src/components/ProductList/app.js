import React from 'react';
import DOM from 'react-dom-factories';
import PropTypes from 'prop-types';
import './style.css'

import ProductItem from '../ProductItem/app'

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
        selectedProduct: PropTypes.string
      })
    )
  };

  state = {
    productList: this.props.productList,
    selectedProduct: null
  };

  userConfirmation = (prodToDelete) => {
    return confirm(`Вы действительно хотите удалить ${prodToDelete.name}`);
  };

  onProductDelete = (prodToDelete) => {
    if (!this.userConfirmation(prodToDelete)) {
      return false;
    }
    const filteredLis = this.state.productList.filter((product) => {
      return prodToDelete.id !== product.id
    });

    this.setState({productList: filteredLis});
  };

  onProductClick = (productId) => {
    this.setState({selectedProduct: productId})
  };

  render() {
    return DOM.div({className: 'product'},
        DOM.h1({className: 'shopName'}, this.props.shopName),
        DOM.table({className: 'product__table'},
            DOM.tbody(null,
                this.state.productList.length ?
                    this.state.productList.map((prod) => {
                      return React.createElement(ProductItem, {
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
}

export default ProductList;