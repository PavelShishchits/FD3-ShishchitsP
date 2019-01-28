import React, { Fragment } from 'react';
import {Route} from 'react-router-dom';
import Page_Operator from './Page_Operator';
import Page_Client from './Page_Client';
const mobileData = require('../data.json');

class Routes extends React.Component {

  render() {

    return (
      <Fragment>
        <Route path='/velcom' exact render={(props) => <Page_Operator {...props} clients={mobileData.velcom} />}/>
        <Route path='/mts' exact render={(props) => <Page_Operator {...props} clients={mobileData.mts} />}/>
        <Route path='/velcom/client/:clid' render={(props) => (<Page_Client {...props} clients={mobileData.velcom} />)}/>
        <Route path='/mts/client/:clid' render={(props) => (<Page_Client {...props} clients={mobileData.mts} />)}/>
      </Fragment>
    )
  }
}

export default Routes;