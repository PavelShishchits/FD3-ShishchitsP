"use strict";

import React from 'react';
import renderer from 'react-test-renderer';

import Mobile from '../src/components/Mobile/index';

const mobileData = require('../src/data.json');

test('работа компонента Mobile', () => {

  const component = renderer.create(
    <Mobile currCompanyName={mobileData.currCompanyName} clients={mobileData.clients}/>
  );

  let componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();

  const addBtn = component.root.find((el) => el.props.className === 'btn edit-btn add-client');

  addBtn.props.onClick(); // Кнопка добавления клиента
  expect(componentTree).toMatchSnapshot();

});
