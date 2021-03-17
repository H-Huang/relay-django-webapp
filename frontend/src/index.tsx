import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import environment from "./RelayEnvironment";
import ErrorBoundary from "./components/ErrorBoundary";

import { BrowserRouter } from "react-router-dom";

const { RelayEnvironmentProvider } = require("react-relay");

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <RelayEnvironmentProvider environment={environment}>
        <ErrorBoundary>
          <React.Suspense fallback={null}>
            <App />
          </React.Suspense>
        </ErrorBoundary>
      </RelayEnvironmentProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
