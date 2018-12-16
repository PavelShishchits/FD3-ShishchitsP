var ProductItem = React.createClass({

  displayName: 'ProductItem',

  propTypes: {
    name: React.PropTypes.string.isRequired,
    price: React.PropTypes.number.isRequired,
    picUrl: React.PropTypes.string.isRequired,
    balance: React.PropTypes.number.isRequired
  },

  highlightRow: function(e) {
    const curTrg = e.currentTarget;
    curTrg.classList.add('highlight');
    this.props.cbSelected(curTrg);
  },

  render: function () {

    return React.DOM.tr({className: 'product__item', onClick: this.highlightRow},
      React.DOM.td({className: 'product__pic'},
        React.DOM.img({src: `img/${this.props.picUrl}`, alt: this.props.name})
      ),
      React.DOM.td({className: 'product__name'}, this.props.name),
      React.DOM.td({className: 'product__price'}, this.props.price),
      React.DOM.td({className: 'product__balance'}, this.props.balance)
    )
  }
});
