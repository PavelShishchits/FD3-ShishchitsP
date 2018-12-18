const Filter = React.createClass({

    'displayName': 'Filter',

    propTypes: {
        wordsList: React.PropTypes.arrayOf(
            React.PropTypes.string.isRequired
        )
    },

    getInitialState: function() {
      return {
        wordsList: this.props.words,
        sortOn: false
      }
    },

    sortList: function(e) {
        this.state.sortOn = !this.state.sortOn;
        if (this.state.sortOn) {
            this.setState({wordsList: this.state.wordsList.slice().sort()});
        } else {
            this.setState({wordsList: this.props.words});
        }

    },

    render: function () {
        return React.DOM.div({className: 'filter'},
            React.DOM.div({className: 'filter__input-wrap'},
                React.DOM.div({className: 'filter__check-wrap'},
                    React.DOM.input({type: 'checkbox', name: 'sort', defaultChecked: false, onClick: this.sortList}),
                ),
                React.DOM.input({type: 'text', name: 'filter'})
            ),
            React.DOM.ul({className: 'filter__list'},
                this.state.wordsList.map((word, i) => {
                    return React.DOM.li({className: 'filter__item', key: i}, word)
                })
            )
        );
    }
});