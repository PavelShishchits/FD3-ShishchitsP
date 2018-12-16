var ProductList = React.createClass({
  
  displayName: 'ProductList',

  getDefaultProps: function() {
    return { shopName: 'iShop' }
  },

  getInitialState: function() {
    return {
      productList: this.props.productList,
      selectedProduct: null
    }
  },

  onProductClick: function(product) {
    this.setState({selectedProduct: product})
  },

  propTypes: {
    shopName: React.PropTypes.string.isRequired,
    propductList: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        picUrl: React.PropTypes.string.isRequired,
        balance: React.PropTypes.number.isRequired
      })
    )
  },
  
  render: function () {
    console.log(this.state);

    return React.DOM.div({className: 'product'},
      React.DOM.h1({className: 'shopName'}, this.props.shopName),
      React.DOM.table({className: 'product__table'},
        React.DOM.tbody(null,
          this.state.productList.map((prod) => {
            return React.createElement(ProductItem, {key: prod.id,
              name: prod.name,
              price: prod.price,
              picUrl: prod.picUrl,
              balance: prod.balance,
              cbSelected: this.onProductClick
            })
          })
        )
      )
    )
  }
});