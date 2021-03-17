// LayoutPage.tsx
import React, { useState } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { RouteComponentProps, withRouter } from "react-router";

import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";

import { AUTH_TOKEN } from "../constants";
import { useHistory } from "react-router-dom";

import environment from "../RelayEnvironment";
import graphql from "babel-plugin-relay/macro";
import type { RouterFragment_query$key } from "../__generated__/RouterFragment_query.graphql";
import { RecordSourceProxy } from "relay-runtime";

import AppBar from "../components/AppBar";

const {
  loadQuery,
  usePreloadedQuery,
  useFragment,
  commitLocalUpdate,
} = require("react-relay");

function signOut() {
  commitLocalUpdate(environment, (store: RecordSourceProxy) => {
    console.log(store);
    const clientStore = store.getRoot().getLinkedRecord("clientStore");
    localStorage.removeItem(AUTH_TOKEN);
    clientStore?.setValue(null, "authToken");
    console.log(clientStore);
  });
}

const routerFragment = graphql`
  fragment RouterFragment_query on Query {
    clientStore {
      authToken
    }
  }
`;

type Props = {
  clientStore: RouterFragment_query$key;
  children?: JSX.Element;
};

const LayoutPage = (props: Props) => {
  const data = useFragment(routerFragment, props.clientStore);
  return (
    <React.Fragment>
      <AppBar
        loggedIn={data.clientStore.authToken !== null}
        signOutMethod={signOut}
      />
      <div className="navigationWrapper">
        <main>{props.children}</main>
      </div>
    </React.Fragment>
  );
};

export default LayoutPage;
