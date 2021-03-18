// .storybook/preview.js
import React from "react";

import "../src/index.css"; //👈 The app's CSS file goes here

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

export const decorators = [
  muiTheme(),
  (Story) => (
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
  ),
];
