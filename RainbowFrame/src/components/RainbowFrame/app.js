import React from 'react';
import PropTypes from 'prop-types';


class RainbowFrame extends React.Component {

  static propTypes = {
    color: PropTypes.string.isRequired
  };

  render() {
    return (
      <div className='rainbowFrame' style={{border: `3px solid ${this.props.color}`}}>
        {this.props.children}
      </div>
    );
  }
}

export default RainbowFrame;