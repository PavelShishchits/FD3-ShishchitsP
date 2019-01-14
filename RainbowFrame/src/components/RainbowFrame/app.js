import React from 'react';
import PropTypes from 'prop-types';


class RainbowFrame extends React.Component {

  static propTypes = {
    colors: PropTypes.arrayOf(
      PropTypes.string.isRequired
    ).isRequired
  };

  render() {
    const colors = this.props.colors;
    return (
      colors.length ?
      <div key={colors[0]} className='rainbowFrame' style={{border: `3px solid ${colors[0]}`}}>
        <RainbowFrame colors={colors.slice(1)}>{this.props.children}</RainbowFrame>
      </div>
      :
      <div>{this.props.children}</div>
    )
  }
}

export default RainbowFrame;