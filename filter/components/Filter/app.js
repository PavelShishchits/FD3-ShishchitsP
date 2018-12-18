const Filter = React.createClass({

    'displayName': 'Filter',

    getInitialState: function() {
      return {
        wordsList: this.props.words
      }
    },

    sortList: function(e) {
        console.log(e.target.value);
    },

    render: function () {
        return React.DOM.div({className: 'filter'},
            React.DOM.div({className: 'filter__input-wrap'},
                React.DOM.div({className: 'filter__check-wrap'},
                    React.DOM.input({type: 'checkbox', onClick: this.sortList}),
                ),
                React.DOM.input({type: 'text'})
            ),
            React.DOM.ul({className: 'filter__list'},
                this.state.wordsList.map((word, i) => {
                    return React.DOM.li({className: 'filter__item', key: i}, word)
                })
            )
        );
    }
});