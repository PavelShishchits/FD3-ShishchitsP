export const addClient = (arr, el) => {
  return [...arr, el];
};

export const editClient = (arr, el) => {
  return arr.map((item) => {
    if (item.id === el.id) {
      item = Object.assign({}, el);
    }
    return item;
  });
};

export const removeClient = (arr, id) => {
  return arr.filter((item) => item.id !== id);
};