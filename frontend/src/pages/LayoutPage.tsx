// LayoutPage.tsx
import React from "react";

import { AUTH_TOKEN, history } from "../utils";

import environment from "../RelayEnvironment";
import { RecordSourceProxy } from "relay-runtime";

import AppBar from "../components/AppBar";
import graphql from "babel-plugin-relay/macro";
import { useLazyLoadQuery, useFragment } from "react-relay";

const { commitLocalUpdate } = require("react-relay");

function signOut(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
  event.preventDefault();
  commitLocalUpdate(environment, (store: RecordSourceProxy) => {
    console.log(store);
    const clientStore = store.getRoot().getLinkedRecord("clientStore");
    localStorage.removeItem(AUTH_TOKEN);
    clientStore?.setValue(null, "authToken");
    console.log(clientStore);
  });
  history.go(0);
}

type Props = {
  data: any;
  children?: React.ReactNode;
};

const LayoutPage = (props: Props) => {
  console.log(props);
  return (
    <React.Fragment>
      <AppBar
        loggedIn={props?.data?.whoami?.id !== undefined}
        signOutMethod={signOut}
      />
      <div className="navigationWrapper">
        <main>{props.children}</main>
      </div>
    </React.Fragment>
  );
};

export default LayoutPage;
