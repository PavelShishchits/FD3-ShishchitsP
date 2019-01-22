'use strict';

import React from 'react';
import renderer from 'react-test-renderer';

import Mobile from '../src/components/Mobile/index';
const mobileData = require('../src/data.json');

console.log(Mobile);

test('работа TestComponent', () => {

  const component = renderer.create(
    <Mobile currCompanyName={mobileData.currCompanyName} clients={mobileData.clients}/>
  );

  let componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();
    
});
