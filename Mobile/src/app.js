import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './app.scss';
import Navigation from './components/Navigation/index';
import Routes from './pages/Routes';

ReactDOM.render(
  <BrowserRouter>
    <div className='container'>
      <Navigation />
      <Routes />
    </div>
  </BrowserRouter>
  ,document.querySelector('.main-wrap')
);