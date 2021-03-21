import React from "react";
import { Route } from "react-router-dom";

import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import MainPage from "./pages/MainPage";
import LayoutPage from "./pages/LayoutPage";

import environment from "./RelayEnvironment";
import type { AppQuery as AppQueryType } from "./__generated__/AppQuery.graphql";
import graphql from "babel-plugin-relay/macro";
import { loadQuery, usePreloadedQuery } from "react-relay";
import { createOperationDescriptor } from "relay-runtime";

const query = graphql`
  query AppQuery {
    whoami {
      id
      username
      email
      dateJoined
    }
  }
`;

const appQueryReference = loadQuery<AppQueryType>(environment, query, {});

function App() {
  const data = usePreloadedQuery<AppQueryType>(query, appQueryReference);
  console.log(data);

  return (
    <LayoutPage data={data}>
      <Route
        exact
        path="/"
        render={(props) => <MainPage {...props} data={data} />}
      />
      <Route exact path="/SignIn" component={SignInPage} />
      <Route exact path="/SignUp" component={SignUpPage} />
    </LayoutPage>
  );
}

export default App;
