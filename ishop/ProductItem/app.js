var ProductItem = React.createClass({

  displayName: 'ProductItem',

  propTypes: {
    name: React.PropTypes.string.isRequired,
    price: React.PropTypes.number.isRequired,
    picUrl: React.PropTypes.string.isRequired,
    balance: React.PropTypes.number.isRequired
  },

  render: function () {

    return React.DOM.tr({className: 'product__item'},
      React.DOM.td(null,
        React.DOM.img({src: `img/${this.props.picUrl}`, alt: this.props.name})
      ),
      React.DOM.td(null, this.props.name),
      React.DOM.td(null, this.props.price),
      React.DOM.td(null, this.props.balance)
    )
  }
});
