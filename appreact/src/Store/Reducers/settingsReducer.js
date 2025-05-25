import {
  UPDATE_SETTINGS_SUCCESS,
  UPDATE_SETTINGS_OPTIMISTIC,
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
      category: 'Material',
      description: 'Spokojny oceaniczny motyw z turkusowymi akcentami',
      gradientColors: ['#80CBC4', '#4DB6AC'],
    },
    {
      name: 'Material Darker',
      primaryColor: '#82B1FF',
      secondaryColor: '#FF9D76',
      textColor: '#E0E0E0',
      backgroundColor: '#263238',
      category: 'Material',
      description: 'Ciemny motyw o wysokim kontraście',
      gradientColors: ['#82B1FF', '#448AFF'],
    },
    {
      name: 'Material Lighter',
      primaryColor: '#2979FF',
      secondaryColor: '#FF6D00',
      textColor: '#546E7A',
      backgroundColor: '#F5F5F5',
      category: 'Material',
      description: 'Jasny i przyjazny motyw dzienny',
      gradientColors: ['#2979FF', '#1976D2'],
    },
    {
      name: 'Material Palenight',
      primaryColor: '#82AAFF',
      secondaryColor: '#89DDFF',
      textColor: '#B7C5D3',
      backgroundColor: '#292D3E',
      category: 'Material',
      description: 'Nocny motyw z subtelnymi kolorami',
      gradientColors: ['#82AAFF', '#7986CB'],
    },
    {
      name: 'Material Deep Ocean',
      primaryColor: '#82B1FF',
      secondaryColor: '#80CBC4',
      textColor: '#CDD3DE',
      backgroundColor: '#0D1F2D',
      category: 'Material',
      description: 'Głęboki oceaniczny motyw dla profesjonalistów',
      gradientColors: ['#82B1FF', '#26C6DA'],
    },
    {
      name: 'Corporate Elite',
      primaryColor: '#1E293B',
      secondaryColor: '#3B82F6',
      textColor: '#F8FAFC',
      backgroundColor: '#0F172A',
      category: 'Business',
      description: 'Elegancki motyw korporacyjny dla firm premium',
      gradientColors: ['#1E293B', '#334155'],
    },
    {
      name: 'Executive Gold',
      primaryColor: '#F59E0B',
      secondaryColor: '#EF4444',
      textColor: '#1F2937',
      backgroundColor: '#FFFBEB',
      category: 'Business',
      description: 'Luksusowy złoty motyw dla najważniejszych klientów',
      gradientColors: ['#F59E0B', '#FBBF24'],
    },
    {
      name: 'Professional Navy',
      primaryColor: '#1E40AF',
      secondaryColor: '#059669',
      textColor: '#F9FAFB',
      backgroundColor: '#111827',
      category: 'Business',
      description: 'Klasyczny motyw w kolorach marynarki wojennej',
      gradientColors: ['#1E40AF', '#2563EB'],
    },
    {
      name: 'Modern Mint',
      primaryColor: '#10B981',
      secondaryColor: '#8B5CF6',
      textColor: '#1F2937',
      backgroundColor: '#F0FDF4',
      category: 'Business',
      description: 'Świeży miętowy motyw dla nowoczesnych firm',
      gradientColors: ['#10B981', '#34D399'],
    },
    {
      name: 'Sunset Gradient',
      primaryColor: '#F97316',
      secondaryColor: '#EC4899',
      textColor: '#FFFFFF',
      backgroundColor: '#1F2937',
      category: 'Creative',
      description: 'Ciepły motyw zachodu słońca',
      gradientColors: ['#F97316', '#EC4899', '#8B5CF6'],
    },
    {
      name: 'Aurora Borealis',
      primaryColor: '#06B6D4',
      secondaryColor: '#10B981',
      textColor: '#F8FAFC',
      backgroundColor: '#0C4A6E',
      category: 'Creative',
      description: 'Magiczny motyw zorzy polarnej',
      gradientColors: ['#06B6D4', '#10B981', '#8B5CF6'],
    },
    {
      name: 'Lavender Dream',
      primaryColor: '#A855F7',
      secondaryColor: '#EC4899',
      textColor: '#F8FAFC',
      backgroundColor: '#581C87',
      category: 'Creative',
      description: 'Delikatny lawendowy motyw o spokojnym charakterze',
      gradientColors: ['#A855F7', '#C084FC'],
    },
    {
      name: 'Forest Fresh',
      primaryColor: '#16A34A',
      secondaryColor: '#CA8A04',
      textColor: '#F7FEE7',
      backgroundColor: '#14532D',
      category: 'Creative',
      description: 'Naturalny leśny motyw z akcentami złota',
      gradientColors: ['#16A34A', '#22C55E'],
    },
    {
      name: 'Pure Minimal',
      primaryColor: '#374151',
      secondaryColor: '#6B7280',
      textColor: '#111827',
      backgroundColor: '#FFFFFF',
      category: 'Minimal',
      description: 'Czysty minimalizm w odcieniach szarości',
      gradientColors: ['#374151', '#4B5563'],
    },
    {
      name: 'Soft Beige',
      primaryColor: '#A8A29E',
      secondaryColor: '#78716C',
      textColor: '#44403C',
      backgroundColor: '#FAFAF9',
      category: 'Minimal',
      description: 'Miękki beżowy motyw o ciepłym charakterze',
      gradientColors: ['#A8A29E', '#D6D3D1'],
    },
    {
      name: 'Elegant Charcoal',
      primaryColor: '#525252',
      secondaryColor: '#DC2626',
      textColor: '#F5F5F5',
      backgroundColor: '#171717',
      category: 'Minimal',
      description: 'Elegancki węglowy motyw z czerwonymi akcentami',
      gradientColors: ['#525252', '#737373'],
    },
    {
      name: 'High Contrast Pro',
      primaryColor: '#000000',
      secondaryColor: '#FFFFFF',
      textColor: '#FFFFFF',
      backgroundColor: '#000000',
      category: 'Accessibility',
      description: 'Maksymalny kontrast dla lepszej czytelności',
      gradientColors: ['#000000', '#374151'],
    },
    {
      name: 'Soft Contrast',
      primaryColor: '#1F2937',
      secondaryColor: '#F3F4F6',
      textColor: '#FFFFFF',
      backgroundColor: '#111827',
      category: 'Accessibility',
      description: 'Łagodny kontrast przyjazny dla oczu',
      gradientColors: ['#1F2937', '#374151'],
    },
  ],

  settings: {
    designName: 'Material Palenight',
    lang: 'en',
    templateInvoice: 'basicInput',
  },
};

const settingsReducer = (state = initialState, action) => {
  console.log('🔄 settingsReducer - Action:', {
    type: action.type,
    payload: action.payload,
    currentState: state.settings,
  });

  switch (action.type) {
    case GET_SETTINGS_SUCCESS:
      const newStateGet = {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload,
        },
      };
      console.log('✅ GET_SETTINGS_SUCCESS - New state:', newStateGet.settings);
      return newStateGet;

    case UPDATE_SETTINGS_OPTIMISTIC:
      // Optimistic update - natychmiast aktualizujemy stan bez czekania na backend
      const newStateOptimistic = {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload,
        },
      };
      console.log(
        '🚀 UPDATE_SETTINGS_OPTIMISTIC - New state:',
        newStateOptimistic.settings,
      );
      return newStateOptimistic;

    case UPDATE_SETTINGS_SUCCESS:
      if (
        action.payload &&
        typeof action.payload === 'object' &&
        action.payload.name &&
        action.payload.value !== undefined
      ) {
        const newStateUpdate1 = {
          ...state,
          settings: {
            ...state.settings,
            [action.payload.name]: action.payload.value,
          },
        };
        console.log(
          '✅ UPDATE_SETTINGS_SUCCESS (name/value) - New state:',
          newStateUpdate1.settings,
        );
        return newStateUpdate1;
      } else {
        const newStateUpdate2 = {
          ...state,
          settings: {
            ...state.settings,
            ...action.payload,
          },
        };
        console.log(
          '✅ UPDATE_SETTINGS_SUCCESS (object) - New state:',
          newStateUpdate2.settings,
        );
        return newStateUpdate2;
      }
    default:
      return state;
  }
};

export default settingsReducer;
