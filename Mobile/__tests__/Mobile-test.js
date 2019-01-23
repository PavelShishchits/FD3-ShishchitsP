"use strict";

import React from 'react';
import renderer from 'react-test-renderer';

import Mobile from '../src/components/Mobile/index';

const mobileData = require('../src/test-data.json');

test('работа компонента Mobile', () => {

  const component = renderer.create(
    <Mobile currCompanyName={mobileData.currCompanyName} clients={mobileData.clients}/>
  );

  let componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();

  // component.root.instance.state.filterMod = 'active';
  // expect(componentTree).toMatchSnapshot();

  // component.root.instance.state.filterMod = 'unavail';

  // const instance = component.root.instance;
  // instance.setState({filterMod: 'active'}, () => {
  //   componentTree = component.toJSON();
  //   expect(componentTree).toMatchSnapshot();
  // });


  const activeBtn = component.root.find((el) => el.props.className === 'btn filter-active');
  // const unavailBtn = component.root.find((el) => el.props.className === 'btn filter-unavail');
  // const allBtn = component.root.find((el) => el.props.className === 'btn filter-all');
  //
  activeBtn.props.onClick(); // Кнопка фильтрации клинетов со статусом "активен"

  componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();

  //
  // allBtn.props.onClick(); // Кнопка фильтрации клинетов со статусом "все"
  // expect(componentTree).toMatchSnapshot();
  //
  // unavailBtn.props.onClick(); // Кнопка фильтрации клинетов со статусом "неактивен"
  // expect(componentTree).toMatchSnapshot();
  //
  // allBtn.props.onClick(); // Кнопка фильтрации клинетов со статусом "все"
  // expect(componentTree).toMatchSnapshot();
});
