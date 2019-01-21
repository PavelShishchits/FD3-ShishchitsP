import React from 'react';
import ReactDOM from 'react-dom';
import './app.scss';
import Mobile from "./components/Mobile/index";
const mobileData = require('./data.json');

ReactDOM.render(
  <Mobile currCompanyName={mobileData.currCompanyName} clients={mobileData.clients}/>,
  document.querySelector('.main-wrap')
);