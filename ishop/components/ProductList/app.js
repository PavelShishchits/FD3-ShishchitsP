var ProductList = React.createClass({
  
  displayName: 'ProductList',

  getDefaultProps: function() {
    return { shopName: 'iShop' }
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

    return React.DOM.div({className: 'product'},
      React.DOM.h1({className: 'shopName'}, this.props.shopName),
      React.DOM.table({className: 'product__table'},
        React.DOM.tbody(null,
          this.props.productList.map((prod) => {
            return React.createElement(ProductItem, {key: prod.id, name: prod.name, price: prod.price, picUrl: prod.picUrl, balance: prod.balance})
          })
        )
      )
    )
  }
});