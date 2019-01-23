import * as mModules from '../src/modules/mobile';
const mobileData = require('../src/test-data.json');

describe('AddClient func tests', () => {

  test('returned array shouldn\'t be equal to passed array', () => {
    expect(mModules.addClient(mobileData.clients, mobileData.newClient)).not.toEqual(mobileData.clients);
  });

  test('Returned array\'s length should be incresed by 1 per function call', () => {
    expect(mModules.addClient(mobileData.clients, mobileData.newClient)).toHaveLength(mobileData.clients.length + 1);
  });

  test('new array should contain added element', () => {
    expect(mModules.addClient(mobileData.clients, mobileData.newClient)).toContain(mobileData.newClient);
  });

  test('Reference to array always should change', () => {
    expect(mModules.addClient(mobileData.clients, mobileData.newClient)).not.toBe(mobileData.clients);
  });
});

describe('EditClient func test', () => {

  test('when pass client without edditting, returned array should be deepEqual to passed array', () => {
    expect(mModules.editClient(mobileData.clients, mobileData.clients[0])).toEqual(mobileData.clients);
  });

  test('Reference to array always should change', () => {
    expect(mModules.editClient(mobileData.clients, mobileData.clients[0])).not.toBe(mobileData.clients);
  });

  test('Returned array\'s length should be equal to passed array length', () => {
    expect(mModules.editClient(mobileData.clients, mobileData.clients[0])).toHaveLength(mobileData.clients.length);
  });

  test('Checks if function effects on other elements in array', () => {

    let edittedClient = {
      id: 3,
      name: "Вячеслав",
      surName: "Глеб",
      secondName: "Юрьевич",
      balance: -150,
      status: 0
    };

    mModules.editClient(mobileData.clients, edittedClient).forEach((client, i) => {
      if (client.id !== edittedClient.id) {
        expect(client).toEqual(mobileData.clients[i])
      } else {
        expect(edittedClient).not.toEqual(mobileData.clients[i]);
      }
    })
  })

});

describe('Delete client func test', () => {

  test('Returned array should contain one less element', () => {
    expect(mModules.removeClient(mobileData.clients, 1)).toHaveLength(mobileData.clients.length - 1);
  });

  test('Returned array shouldn\'t contain removed element', () => {
    expect(mModules.removeClient(mobileData.clients, 1)).not.toContain(mobileData.clients.find((client) => client.id === 1));
  });

  test('Reference to array always should change', () => {
    expect(mModules.removeClient(mobileData.clients, 1)).not.toBe(mobileData.clients);
  });
});