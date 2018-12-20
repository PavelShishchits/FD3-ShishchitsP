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

    checkBoxHandler: function() {
        this.setState({isChecked: !this.state.isChecked}, this.sortList);
    },

    sortList: function() {
        this.setState({wordsList: this.state.isChecked ? this.state.wordsList.slice().sort() : this.props.words.filter(this.filterCb)})
    },

    inputHandler: function(e) {
        this.setState({filterText: e.target.value}, this.filterList);
    },

    filterList: function(e) {
        const filteredList = this.props.words.filter(this.filterCb);
        this.setState((currenetState, props) => {
            return {wordsList: this.state.isChecked ? filteredList.slice().sort() : filteredList}
        });
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
