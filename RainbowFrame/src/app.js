import React from 'react';
import ReactDOM from 'react-dom';
import RainbowFrame from "./components/RainbowFrame/app";

ReactDOM.render(
    <RainbowFrame colors={['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple']}>Hello</RainbowFrame>,
    document.querySelector('.container')
);