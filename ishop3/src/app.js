import React from 'react';
import ReactDOM from 'react-dom';
import ProductList from './components/ProductList/app'
const shopData = require('./data.json');

ReactDOM.render(
    React.createElement(ProductList, {shopName: shopData.name, productList: shopData.productList}),
    document.querySelector('.container')
);