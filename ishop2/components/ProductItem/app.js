var ProductItem = React.createClass({

  displayName: 'ProductItem',

  getDefaultProps: function() {
    return {deleteBtn: 'Удалить'}
  },

  propTypes: {
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    price: React.PropTypes.number.isRequired,
    picUrl: React.PropTypes.string.isRequired,
    balance: React.PropTypes.number.isRequired,
    selectedProduct: React.PropTypes.string,
    highlightProduct: React.PropTypes.func,
    deleteProduct: React.PropTypes.func
  },

  deleteProduct: function(e) {
     e.stopPropagation();
     this.props.cbDeleted(this.props);
  },

  highlightProduct: function() {
    this.props.cbSelected(this.props.id);
  },

  render: function () {

    return React.DOM.tr({className: `product__item ${this.props.id === this.props.selectedProduct ? `highlight` : ``}`, onClick: this.highlightProduct},
      React.DOM.td({className: 'product__pic'},
        React.DOM.img({src: `img/${this.props.picUrl}`, alt: this.props.name})
      ),
      React.DOM.td({className: 'product__name'}, this.props.name),
      React.DOM.td({className: 'product__price'}, this.props.price),
      React.DOM.td({className: 'product__balance'}, this.props.balance),
      React.DOM.td({className: 'product__delete'},
        React.DOM.button({className: 'btn delete-btn', onClick: this.deleteProduct}, this.props.deleteBtn)
      )
    )
  }
});
