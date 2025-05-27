const initialState = {
  checkbox1: false,
  checkbox2: false,
  checkbox3: false,
  selectedOption: "none",
};

export const templateReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_CHECKBOX":
      return {
        ...state,
        [action.payload]: !state[action.payload],
      };
    case "SELECT_OPTION":
      return {
        ...state,
        selectedOption: action.payload,
      };
    default:
      return state;
  }
};
