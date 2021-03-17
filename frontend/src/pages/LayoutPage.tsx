// LayoutPage.tsx
import React, { useState } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { RouteComponentProps, withRouter } from "react-router";

import { AUTH_TOKEN } from "../constants";
import { useHistory } from "react-router-dom";

import environment from "../RelayEnvironment";
import graphql from "babel-plugin-relay/macro";
import type { LayoutPageFragment_query$key } from "./__generated__/LayoutPageFragment_query.graphql";
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

const fragment = graphql`
  fragment LayoutPageFragment_query on Query {
    clientStore {
      authToken
    }
  }
`;

type Props = {
  clientStore: LayoutPageFragment_query$key;
  children?: React.ReactNode;
};

const LayoutPage = (props: Props) => {
  const data = useFragment(fragment, props.clientStore);
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
