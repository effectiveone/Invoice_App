export const SELECT_OPTION = 'SELECT_OPTION';
export const TOGGLE_CHECKBOX = 'TOGGLE_CHECKBOX';

export const toggleCheckbox = (checkboxName: string) => {
  return {
    type: 'TOGGLE_CHECKBOX',
    payload: checkboxName,
  };
};

export const selectOption = (optionName: string) => {
  return {
    type: 'SELECT_OPTION',
    payload: optionName,
  };
};
