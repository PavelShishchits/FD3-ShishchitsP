import React, { Fragment } from 'react';
import {NavLink} from "react-router-dom";
import './style.scss';

class Navigation extends React.Component {

  render() {

    return (
      <nav className='nav'>
        <NavLink to="/velcom" className='nav-link' activeClassName='nav-link--active'>Velcom</NavLink>
        <NavLink to="/mts" className='nav-link' activeClassName='nav-link--active'>Mts</NavLink>
      </nav>
    )
  }
}

export default Navigation;