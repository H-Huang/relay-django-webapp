// .storybook/preview.js
import React from "react";

//👇 Configures Storybook to log the actions( onArchiveTask and onPinTask ) in the UI.
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  // temporary workaround: https://github.com/storybookjs/storybook/issues/11554
  docs: {
    source: {
      type: "code",
    },
  },
};

// global decorators
import { RelayEnvironmentProvider } from "react-relay";
import environment from "../src/RelayEnvironment";
import ErrorBoundary from "../src/components/ErrorBoundary";
import { MemoryRouter } from "react-router-dom";
import { muiTheme } from "storybook-addon-material-ui";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../src/MuiTheme";
import CssBaseline from "@material-ui/core/CssBaseline";

export const decorators = [
  muiTheme(),
  (Story) => (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MemoryRouter>
        <RelayEnvironmentProvider environment={environment}>
          <ErrorBoundary>
            <React.Suspense fallback={null}>
              <div style={{ margin: "3em" }}>
                <Story />
              </div>
            </React.Suspense>
          </ErrorBoundary>
        </RelayEnvironmentProvider>
      </MemoryRouter>
    </ThemeProvider>
  ),
];
