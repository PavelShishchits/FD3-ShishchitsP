import React from 'react';
import Mobile from '../components/Mobile';

export default (props) => {
  return <Mobile path={props.match.path} clients={props.clients} />
}