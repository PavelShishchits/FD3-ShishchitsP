"use strict";

import React from 'react';
import { shallow } from 'enzyme';

import Mobile from '../src/components/Mobile/index';

const mobileData = require('../src/test-data.json');

describe('Mobile\'s component filter work ', () => {

  const activeMobileClients = mobileData.clients.filter((client) => client.status === 1);
  const unavailMobileClients = mobileData.clients.filter((client) => client.status === 0);

  it('should render only clients with active status', () => {
    var mockValue = {
      target: {
        value: 'active'
      }
    };
    const mobileComponent = shallow(<Mobile clients={mobileData.clients} currCompanyName={mobileData.currCompanyName} />);
    mobileComponent.find('.filter-all').simulate('click', mockValue);

    const filteredClients = mobileComponent.find('MobileClient');
    expect(filteredClients.length).toBe(activeMobileClients.length);

    expect(mobileComponent).toMatchSnapshot();
  });

  it('should render only clients with unavail status', () => {
    var mockValue = {
      target: {
        value: 'unavail'
      }
    };

    const mobileComponent = shallow(<Mobile clients={mobileData.clients} currCompanyName={mobileData.currCompanyName} />);
    mobileComponent.find('.filter-all').simulate('click', mockValue);

    const filteredClients = mobileComponent.find('MobileClient');
    expect(filteredClients.length).toBe(unavailMobileClients.length);

    expect(mobileComponent).toMatchSnapshot();
  });

  it('should render all clients', () => {
    var mockValue = {
      target: {
        value: 'all'
      }
    };

    const mobileComponent = shallow(<Mobile clients={mobileData.clients} currCompanyName={mobileData.currCompanyName} />);
    mobileComponent.find('.filter-all').simulate('click', mockValue);

    const filteredClients = mobileComponent.find('MobileClient');
    expect(filteredClients.length).toBe(mobileData.clients.length);

    expect(mobileComponent).toMatchSnapshot();
  });

});
