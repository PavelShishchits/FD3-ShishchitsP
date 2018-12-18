const Filter = React.createClass({

    'displayName': 'Filter',

    getInitialState: function() {
        return {
            wordsList: this.props.words,
            filterText: '',
            isChecked: false
        }
    },

    propTypes: {
        words: React.PropTypes.arrayOf(
            React.PropTypes.string.isRequired
        ).isRequired
    },

    checkBoxHandler: function() {
        this.setState({isChecked: !this.state.isChecked}, this.sortList);
    },

    sortList: function() {
        if (this.state.isChecked) {
            this.setState({wordsList: this.props.words.slice().sort()});
        } else {
            this.setState({wordsList: this.props.words});
        }
    },

    inputHandler: function(e) {
        this.setState({filterText: e.target.value});
    },

    render: function () {
        console.log(this.state.wordsList.length);
        return React.DOM.div({className: 'filter'},
            React.DOM.div({className: 'filter__input-wrap'},
                React.DOM.div({className: 'filter__check-wrap'},
                    React.DOM.input({type: 'checkbox', name: 'sort', checked: this.state.isChecked, onClick: this.checkBoxHandler}),
                ),
                React.DOM.input({type: 'text', name: 'filter', onChange: this.inputHandler})
            ),
            React.DOM.ul({className: 'filter__list'},
                this.state.wordsList
                    .filter((word) => {
                        return word.toLowerCase().indexOf(this.state.filterText.toLowerCase()) >= 0;
                    })
                    .map((word) => {
                        return React.DOM.li({className: 'filter__item', key: word}, word)
                    })
            )
        );
    }
});
