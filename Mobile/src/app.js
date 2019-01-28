import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './app.scss';
import Navigation from './components/Navigation/index';
import Routes from './pages/Routes';
import Mobile from './components/Mobile/index'; // temp

ReactDOM.render(
  <BrowserRouter>
    <div className='container'>
      <Mobile />
      {/*<Navigation />*/}
      {/*<Routes />*/}
    </div>
  </BrowserRouter>
  ,document.querySelector('.main-wrap')
);