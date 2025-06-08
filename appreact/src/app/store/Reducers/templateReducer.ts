interface TemplateState {
  checkbox1: boolean;
  checkbox2: boolean;
  checkbox3: boolean;
  selectedOption: string;
  [key: string]: any;
}

interface TemplateAction {
  type: string;
  payload?: any;
}

const initialState: TemplateState = {
  checkbox1: false,
  checkbox2: false,
  checkbox3: false,
  selectedOption: 'none',
};

export const templateReducer = (
  state = initialState,
  action: TemplateAction,
): TemplateState => {
  switch (action.type) {
    case 'TOGGLE_CHECKBOX':
      return {
        ...state,
        [action.payload]: !state[action.payload],
      };
    case 'SELECT_OPTION':
      return {
        ...state,
        selectedOption: action.payload,
      };
    default:
      return state;
  }
};
