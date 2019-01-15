import React from 'react';
import ReactDOM from 'react-dom';
import Mobile from "./components/Mobile/index";
const mobileData = require('./data.json');

ReactDOM.render(
    <Mobile/>,
    document.querySelector('.container')
);