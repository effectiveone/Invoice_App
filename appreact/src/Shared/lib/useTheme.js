import { createTheme } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

const useTheme = () => {
  const dispatch = useDispatch();
  const [selectedDesign, setSelectedDesign] = useState();
  const design = useSelector((state) => state?.settings.mySystemOfDesign);
  const selectedDesignName = useSelector(
    (state) => state?.settings.settings.designName,
  );

  useEffect(() => {
    const foundDesign = design?.find((p) => p.name === selectedDesignName);
    console.log('🎨 useTheme - Debug Info:', {
      selectedDesignName,
      foundDesign: foundDesign?.name,
      foundDesignColors: foundDesign
        ? {
            primary: foundDesign.primaryColor,
            secondary: foundDesign.secondaryColor,
            background: foundDesign.backgroundColor,
            text: foundDesign.textColor,
          }
        : null,
      allDesigns: design?.map((d) => d.name),
    });
    setSelectedDesign(foundDesign);
  }, [design, selectedDesignName, dispatch]);

  // Funkcja do określenia trybu na podstawie koloru tła
  const getThemeMode = (backgroundColor) => {
    if (!backgroundColor) return 'light';

    // Konwertuj hex na RGB
    const hex = backgroundColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    // Oblicz jasność (luminance)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.5 ? 'light' : 'dark';
  };

  const themeMode = getThemeMode(selectedDesign?.backgroundColor);

  // Funkcja do tworzenia gradientu
  const createGradient = (colors, angle = 135) => {
    if (!colors || colors.length === 0)
      return selectedDesign?.primaryColor || '#667eea';
    if (colors.length === 1) return colors[0];
    return `linear-gradient(${angle}deg, ${colors.join(', ')})`;
  };

  return createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: selectedDesign?.primaryColor || '#667eea',
        light:
          selectedDesign?.gradientColors?.[1] ||
          selectedDesign?.primaryColor ||
          '#667eea',
        dark: selectedDesign?.primaryColor || '#667eea',
        contrastText:
          selectedDesign?.textColor ||
          (themeMode === 'dark' ? '#ffffff' : '#374151'),
      },
      secondary: {
        main: selectedDesign?.secondaryColor || '#764ba2',
        light: selectedDesign?.secondaryColor || '#764ba2',
        dark: selectedDesign?.secondaryColor || '#764ba2',
        contrastText:
          selectedDesign?.textColor ||
          (themeMode === 'dark' ? '#ffffff' : '#374151'),
      },
      background: {
        default: selectedDesign?.backgroundColor || '#f8fafc',
        paper:
          themeMode === 'dark'
            ? selectedDesign?.backgroundColor
              ? `color-mix(in srgb, ${selectedDesign.backgroundColor} 80%, white 20%)`
              : '#1f2937'
            : '#ffffff',
      },
      text: {
        primary:
          selectedDesign?.textColor ||
          (themeMode === 'dark' ? '#f8fafc' : '#374151'),
        secondary: themeMode === 'dark' ? '#d1d5db' : '#6b7280',
      },
      grey: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
      },
      divider:
        themeMode === 'dark'
          ? 'rgba(255, 255, 255, 0.12)'
          : 'rgba(0, 0, 0, 0.12)',
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
      h4: {
        fontWeight: 700,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 12,
            fontWeight: 600,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            },
          },
          contained: {
            background: selectedDesign?.gradientColors
              ? createGradient(selectedDesign.gradientColors)
              : selectedDesign?.primaryColor || '#667eea',
            color: selectedDesign?.textColor || '#ffffff',
            '&:hover': {
              background: selectedDesign?.gradientColors
                ? createGradient(selectedDesign.gradientColors, 45)
                : selectedDesign?.secondaryColor || '#764ba2',
              transform: 'translateY(-2px)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            backgroundImage: 'none',
          },
          elevation1: {
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          },
          elevation2: {
            boxShadow: '0 6px 25px rgba(0, 0, 0, 0.12)',
          },
          elevation3: {
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.16)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: selectedDesign?.gradientColors
              ? createGradient(selectedDesign.gradientColors)
              : `linear-gradient(135deg, ${
                  selectedDesign?.primaryColor || '#667eea'
                } 0%, ${selectedDesign?.secondaryColor || '#764ba2'} 100%)`,
            color: selectedDesign?.textColor || '#ffffff',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            borderRadius: '12px !important',
            marginBottom: '16px',
            '&:before': {
              display: 'none',
            },
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
          },
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            '&.Mui-expanded': {
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 16,
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 12,
              '&:hover fieldset': {
                borderColor: selectedDesign?.primaryColor || '#667eea',
              },
              '&.Mui-focused fieldset': {
                borderColor: selectedDesign?.primaryColor || '#667eea',
              },
            },
            '& .MuiInputLabel-root': {
              '&.Mui-focused': {
                color: selectedDesign?.primaryColor || '#667eea',
              },
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: selectedDesign?.primaryColor || '#667eea',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: selectedDesign?.primaryColor || '#667eea',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'scale(1.1)',
            },
          },
        },
      },
    },
    // Dodatkowe właściwości dla gradientów i motywów
    customTheme: {
      gradient: selectedDesign?.gradientColors
        ? createGradient(selectedDesign.gradientColors)
        : `linear-gradient(135deg, ${
            selectedDesign?.primaryColor || '#667eea'
          } 0%, ${selectedDesign?.secondaryColor || '#764ba2'} 100%)`,
      category: selectedDesign?.category || 'Material',
      description: selectedDesign?.description || '',
      colors: {
        primary: selectedDesign?.primaryColor || '#667eea',
        secondary: selectedDesign?.secondaryColor || '#764ba2',
        background: selectedDesign?.backgroundColor || '#f8fafc',
        text: selectedDesign?.textColor || '#374151',
        gradients: selectedDesign?.gradientColors || [
          selectedDesign?.primaryColor || '#667eea',
          selectedDesign?.secondaryColor || '#764ba2',
        ],
      },
    },
  });
};

export default useTheme;
