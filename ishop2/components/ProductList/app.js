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
    const renewedList = this.state.productList.reduce((totalList, product) => {
      if (prodToDelete.id !== product.id) {
        totalList.push(product);
      }
      return totalList;
    }, []);

    this.setState({productList: renewedList});
  },

  onProductClick: function(productId) {
    this.setState({selectedProduct: productId})
  },

  propTypes: {
    shopName: React.PropTypes.string.isRequired,
    propductList: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        picUrl: React.PropTypes.string.isRequired,
        balance: React.PropTypes.number.isRequired,
        selectedProduct: React.PropTypes.string
      })
    )
  },
  
  render: function () {

    return React.DOM.div({className: 'product'},
      React.DOM.h1({className: 'shopName'}, this.props.shopName),
      React.DOM.table({className: 'product__table'},
        React.DOM.tbody(null,
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
          : React.DOM.tr({className: 'product__item product__item--empty'},
            React.DOM.td({}, this.props.emptyFallbackPhrase)
            )
        )
      )
    )
  }
});