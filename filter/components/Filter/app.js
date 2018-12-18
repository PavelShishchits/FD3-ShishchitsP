const Filter = React.createClass({

    'displayName': 'Filter',

    getDefaultProps: function() {
        return {fallbackText: 'Совпадений нет'}
    },

    getInitialState: function() {
        return {
            wordsList: this.props.words,
            isChecked: false
        }
    },

    propTypes: {
        wordsList: React.PropTypes.arrayOf(
            React.PropTypes.string.isRequired
        )
    },

    checkBoxHandler: function() {
        this.setState({isChecked: !this.state.isChecked}, this.sortList);
    },

    sortList: function() {
        if (this.state.isChecked) {
            this.setState({wordsList: this.state.wordsList.slice().sort()});
        } else {
            this.setState({wordsList: this.props.words});
        }
    },

    filterList: function(e) {
        const trgValue = e.target.value;
        const regExp = new RegExp(trgValue, 'gi');
        const filteredWords = this.props.words.filter((word) => {
            return word.search(regExp) >= 0;
        });
        trgValue.length > 0 ? this.setState((currState, props) => {return {wordsList: filteredWords}}) : this.setState((currState, props) => {return {wordsList: this.props.words}});
    },

    render: function () {
        console.log(this.state.wordsList);
        return React.DOM.div({className: 'filter'},
            React.DOM.div({className: 'filter__input-wrap'},
                React.DOM.div({className: 'filter__check-wrap'},
                    React.DOM.input({type: 'checkbox', name: 'sort', checked: this.state.isChecked, onClick: this.checkBoxHandler}),
                ),
                React.DOM.input({type: 'text', name: 'filter', onChange: this.filterList})
            ),
            React.DOM.ul({className: 'filter__list'},
                this.state.wordsList.length ?
                this.state.wordsList.map((word) => {
                    return React.DOM.li({className: 'filter__item', key: word}, word)
                })
                : React.DOM.li({className: 'filter__item'}, this.props.fallbackText)
            )
        );
    }
});
