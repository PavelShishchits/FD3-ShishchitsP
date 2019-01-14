import React from 'react';
import PropTypes from 'prop-types';

class BR2JSX extends React.Component {

  static propTypes = {
    text: PropTypes.string.isRequired
  };

  parseText = (text) => {
    const pattern = /(<br\s*\/?>)/ig;
    const stringArr = text.split(pattern);
    return stringArr.map((item, i) => {
      if (pattern.test(item)) {
        item = <br key={i}/>;
      }
      return item;
    });
  };

  render() {

    return (
      <div className='br2jxs'>{this.parseText(this.props.text)}</div>
    )
  }
}

export default BR2JSX;