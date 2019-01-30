import React from 'react';
import {connect} from 'react-redux';
import {setVisabilityFilters, VisabilityFilters} from "../../redux/actions/filterActions";

class Filter extends React.PureComponent {

  onFilterClick = (e) => {
    this.props.dispatch(setVisabilityFilters(e.target.value));
  };

  render() {

    return (
      <div className='Filter'>
        <button className='btn filter-all' value={VisabilityFilters.SHOW_ALL} onClick={this.onFilterClick}>Все</button>
        <button className='btn filter-active' value={VisabilityFilters.SHOW_ACTIVE} onClick={this.onFilterClick}>Активные</button>
        <button className='btn filter-unavail' value={VisabilityFilters.SHOW_UNACTiVE} onClick={this.onFilterClick}>Заблокированные</button>
      </div>
    )
  }
}

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps)(Filter);