export const SELECT_OPTION = "SELECT_OPTION";
export const TOGGLE_CHECKBOX = "TOGGLE_CHECKBOX";

export const toggleCheckbox = (checkboxName) => {
  return {
    type: "TOGGLE_CHECKBOX",
    payload: checkboxName,
  };
};

export const selectOption = (optionName) => {
  return {
    type: "SELECT_OPTION",
    payload: optionName,
  };
};
