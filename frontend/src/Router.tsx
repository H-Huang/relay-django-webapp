// Router.tsx
import React, { useState } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { RouteComponentProps, withRouter } from "react-router";

import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";

import { AUTH_TOKEN } from "./constants";
import { useHistory } from "react-router-dom";

import environment from "./RelayEnvironment";
import graphql from "babel-plugin-relay/macro";
import type { RouterFragment_query$key } from "./__generated__/RouterFragment_query.graphql";
import { RecordSourceProxy } from "relay-runtime";

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
};

export default function Router(props: Props) {
  const data = useFragment(routerFragment, props.clientStore);
  console.log(props);
  console.log("Router", data);
  const history = useHistory();
  return (
    <BrowserRouter>
      {data.clientStore.authToken === null ? (
        <div>
          <Link to="/SignIn">Sign In</Link>
          <Link to="/SignUp">Sign Up</Link>
        </div>
      ) : (
        <Link
          to="/SignOut"
          onClick={(e) => {
            e.preventDefault();
            signOut();
            // history.push("/main");
          }}
        >
          Sign Out
        </Link>
      )}
      <Route exact path="/SignIn" component={SignIn} />
      <Route exact path="/SignUp" component={SignUp} />
    </BrowserRouter>
  );
}
