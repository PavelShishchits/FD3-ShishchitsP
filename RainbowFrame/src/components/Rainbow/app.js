import React from 'react';
import './style.css'
import RainbowFrame from '../RainbowFrame/app'

class Rainbow extends React.Component {


  render() {
    let colors = ['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];
    let items = colors.map((color, i, arr) => {
      return <RainbowFrame key={color} color={color}>{arr.length - 1 === i ? 'Hello' : ''}</RainbowFrame>;
    });
    return (
      items
    );
  }
}

export default Rainbow;