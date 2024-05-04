import {
  UPDATE_SETTINGS_SUCCESS,
  GET_SETTINGS_SUCCESS,
} from '../Actions/settingsActions';

const initialState = {
  mySystemOfDesign: [
    {
      name: 'Material Oceanic',
      primaryColor: '#80CBC4',
      secondaryColor: '#FFAB40',
      textColor: '#CDD3DE',
      backgroundColor: '#1B2B34',
    },
    {
      name: 'Material Darker',
      primaryColor: '#82B1FF',
      secondaryColor: '#FF9D76',
      textColor: '#E0E0E0',
      backgroundColor: '#263238',
    },
    {
      name: 'Material Lighter',
      primaryColor: '#2979FF',
      secondaryColor: '#FF6D00',
      textColor: '#546E7A',
      backgroundColor: '#F5F5F5',
    },
    {
      name: 'Material Palenight',
      primaryColor: '#82AAFF',
      secondaryColor: '#89DDFF',
      textColor: '#B7C5D3',
      backgroundColor: '#292D3E',
    },
    {
      name: 'Material Deep Ocean',
      primaryColor: '#82B1FF',
      secondaryColor: '#80CBC4',
      textColor: '#CDD3DE',
      backgroundColor: '#0D1F2D',
    },
  ],

  settings: {
    designName: 'Material Palenight',
    lang: 'en',
    templateInvoice: 'basicInput',
  },
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SETTINGS_SUCCESS:
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload,
        },
      };
    case UPDATE_SETTINGS_SUCCESS:
      return {
        ...state,
        settings: {
          ...state.settings,
          [action.payload.name]: action.payload.value,
        },
      };
    default:
      return state;
  }
};

export default settingsReducer;
