export default {

  validateTextInput: (field, min = 2, max) => {
    let {value, isValid, errorMessage} = field;
    isValid = true;
    errorMessage = ``;
    if (value.length < min || value.length > max) {
      isValid = false;
      errorMessage = `Field must contain minimum ${min} and maximum ${max} symbols`
    }
    return Object.assign({}, field, {
      errorMessage: errorMessage,
      isValid: isValid
    });
  },

  validateNumberInput: (field) => {
    let {value, isValid, errorMessage} = field;
    isValid = true;
    errorMessage = ``;

    if (!/^\d+$/.test(value)) {
      isValid = false;
      errorMessage = `Value must be a number`;
    }
    if (value + 0 < 0) {
      isValid = false;
      errorMessage = `Value must be positive number`;
    }
    if (!value.length) {
      isValid = false;
      errorMessage = `Please fill the field`;
    }
    return Object.assign({}, field, {
      value: isValid ? parseInt(value) : value,
      errorMessage: errorMessage,
      isValid: isValid
    });
  },

  validateFileInput: (field) => {

  }
}