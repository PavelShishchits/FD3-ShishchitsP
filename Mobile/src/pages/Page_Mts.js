import React from 'react';
import Mobile from '../components/Mobile';
const mobileData = require('../data.json');

export default () => {
  return <Mobile clients={mobileData.clientsMts} />
}