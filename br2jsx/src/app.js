import React from 'react';
import ReactDOM from 'react-dom';
import BR2JSX from "./components/BR2JSX/app";

ReactDOM.render(
    <BR2JSX text="первый<br>второй<br/>третий<br />последний">Hello</BR2JSX>,
    document.querySelector('.container')
);