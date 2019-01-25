import React, { Fragment } from 'react';
import {Route} from 'react-router-dom';
import Page_Mts from './Page_Mts';
import Page_Velcom from './Page_Velcom';
import Page_Client from './Page_Client';

class Routes extends React.Component {

  render() {

    return (
      <Fragment>
        <Route path='/velcome' component={Page_Velcom}/>
        <Route path='/mts' component={Page_Mts}/>
        <Route path='/client/:clid' component={Page_Client}/>
      </Fragment>
    )
  }
}

export default Routes;