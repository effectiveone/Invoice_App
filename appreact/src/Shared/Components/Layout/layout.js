import React from "react";
import PermanentDrawer from "./drawer";
import Navbar from "./Navbar";
import useTheme from "../../Hook/useTheme";
import { ThemeProvider } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const layout = (WrappedComponent) => {
  return function WithPermanentDrawer(props) {
    const theme = useTheme();

    return (
      <>
        <ThemeProvider theme={theme}>
          <Navbar />
          <PermanentDrawer>
            <Box
              sx={{
                padding: [20, 20, 20, 20],
                margin: [20, 20, 20, 20],
              }}
            >
              <WrappedComponent {...props} />
            </Box>
          </PermanentDrawer>
        </ThemeProvider>
      </>
    );
  };
};

export default layout;
