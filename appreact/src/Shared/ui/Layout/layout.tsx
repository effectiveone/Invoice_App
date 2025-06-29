import React from 'react';
import PermanentDrawer from './drawer';
import Navbar from './Navbar';
import useTheme from '../../lib/useTheme';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';

// Higher-Order Component type definition
const layout = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
): React.FC<P> => {
  const WithPermanentDrawer: React.FC<P> = (props) => {
    const theme = useTheme();

    // Debug logging
    console.log('🎨 Layout - Theme colors:', {
      background: theme.palette.background.default,
      primary: theme.palette.primary.main,
      secondary: theme.palette.secondary.main,
      themeName: theme.customTheme?.description,
    });

    return (
      <>
        <ThemeProvider theme={theme}>
          <PermanentDrawer>
            <Navbar className='' />
            <Box
              sx={{
                padding: { xs: 2, sm: 3, md: 4 },
                minHeight: '100vh',
                background: theme.palette.background.default,
                marginTop: '64px',
                transition: 'background-color 0.3s ease',
              }}
            >
              <WrappedComponent {...props} />
            </Box>
          </PermanentDrawer>
        </ThemeProvider>
      </>
    );
  };

  WithPermanentDrawer.displayName = `withLayout(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;

  return WithPermanentDrawer;
};

export default layout;
