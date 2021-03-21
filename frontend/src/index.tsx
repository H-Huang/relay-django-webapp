import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import environment from "./RelayEnvironment";
import ErrorBoundary from "./components/ErrorBoundary";
import { history } from "./utils";

import { Router } from "react-router-dom";

import { RelayEnvironmentProvider } from "react-relay";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./MuiTheme";
import CssBaseline from "@material-ui/core/CssBaseline";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router history={history}>
        <RelayEnvironmentProvider environment={environment}>
          <ErrorBoundary>
            <React.Suspense fallback={null}>
              <App />
            </React.Suspense>
          </ErrorBoundary>
        </RelayEnvironmentProvider>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
