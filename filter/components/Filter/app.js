const Filter = React.createClass({

    displayName: 'Filter',

    getDefaultProps: function() {
        return {
            fallbackText: 'Совпадений нет'
        }
    },

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

    checkBoxHandler: function(e) {
        this.setState({isChecked: e.target.checked}, this.sortNFilterList);
    },

    inputHandler: function(e) {
        this.setState({filterText: e.target.value}, this.sortNFilterList);
    },

    sortNFilterList: function() {
        let resultArray = this.props.words.slice();
        if (this.state.filterText.length > 0) {
            resultArray = resultArray.filter((word) => word.toLowerCase().indexOf(this.state.filterText.toLowerCase()) > -1);
        }
        if (this.state.isChecked) {
            resultArray.sort();
        }
        this.setState({wordsList: resultArray});
    },

    filterCb: function(word) {
        return word.toLowerCase().indexOf(this.state.filterText.toLowerCase()) >= 0;
    },

    render: function () {
        return React.DOM.div({className: 'filter'},
            React.DOM.div({className: 'filter__input-wrap'},
                React.DOM.div({className: 'filter__check-wrap'},
                    React.DOM.input({type: 'checkbox', name: 'sort', checked: this.state.isChecked, onClick: this.checkBoxHandler}),
                ),
                React.DOM.input({type: 'text', name: 'filter', onChange: this.inputHandler})
            ),
            React.DOM.ul({className: 'filter__list'},
                this.state.wordsList.length > 0
                ?
                this.state.wordsList.map((word) => {
                    return React.DOM.li({className: 'filter__item', key: word}, word)
                })
                :
                React.DOM.li({className: 'filter__item'}, this.props.fallbackText)
            )
        );
    }
});
