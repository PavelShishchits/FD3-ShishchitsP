import {VisabilityFilters} from '../redux/actions/filterActions';

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

export const filterList = (arr, filter) => {
  switch (filter) {
    case VisabilityFilters.SHOW_ALL:
      return arr;
    case VisabilityFilters.SHOW_ACTIVE:
      return arr.filter((item) => item.status === 1);
    case VisabilityFilters.SHOW_UNACTiVE:
      return arr.filter((item) => item.status === 0);
    default:
      return arr;
  }
};

export const generateUniqId = (arr) => {
  if (Array.isArray(arr)) {
    return arr.length ? arr[arr.length - 1].id + 1 : 1;
  } else {
    throw new Error('Для генерации уникального id должен быть передан массив элементов');
  }
};