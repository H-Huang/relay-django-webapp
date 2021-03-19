import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import environment from "./RelayEnvironment";
import ErrorBoundary from "./components/ErrorBoundary";
import { history } from "./utils";

import { Router } from "react-router-dom";

const { RelayEnvironmentProvider } = require("react-relay");

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <RelayEnvironmentProvider environment={environment}>
        <ErrorBoundary>
          <React.Suspense fallback={null}>
            <App />
          </React.Suspense>
        </ErrorBoundary>
      </RelayEnvironmentProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
