import React from "react";
import { Route } from "react-router-dom";

import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import MainPage from "./pages/MainPage";
import LayoutPage from "./pages/LayoutPage";

import Button from "@material-ui/core/Button";

import environment from "./RelayEnvironment";
// import type { PreloadedQuery } from "react-relay";
import type {
  AppQuery as AppQueryType,
  AppQueryResponse,
} from "./__generated__/AppQuery.graphql";
import { AUTH_TOKEN } from "./constants";
import { v4 as uuidv4 } from "uuid";
import graphql from "babel-plugin-relay/macro";
import { RecordSourceProxy } from "relay-runtime";
import {
  loadQuery,
  usePreloadedQuery,
  useQueryLoader,
  commitLocalUpdate,
} from "react-relay";
import { useHistory } from "react-router-dom";

// initial local state
commitLocalUpdate(environment, (store: RecordSourceProxy) => {
  // console.log(store);
  // const clientStore = store.getRoot().getLinkedRecord("clientStore");
  const token = localStorage.getItem(AUTH_TOKEN);
  const newClientStore = store.create(uuidv4(), "clientStore");
  newClientStore.setValue(token, "authToken");
  const root = store.getRoot();
  root.setLinkedRecord(newClientStore, "clientStore");
});

const query = graphql`
  query AppQuery {
    allUsers {
      edges {
        node {
          id
        }
      }
    }
    ...LayoutPageFragment_query
  }
`;

const appQueryReference = loadQuery<AppQueryType>(environment, query, {});

function App() {
  const history = useHistory();
  const data = usePreloadedQuery<AppQueryType>(query, appQueryReference);
  console.log(data);
  const [mainPageQueryRef, loadMainPageQuery] = useQueryLoader<AppQueryType>(
    query
  );

  return (
    <LayoutPage clientStore={data}>
      <Button
        onClick={() => {
          loadMainPageQuery({});
          history.push("/main");
        }}
      >
        click me to go to main manually
      </Button>
      <Route exact path="/main" render={(props) => <MainPage {...props} />} />
      <Route exact path="/SignIn" component={SignInPage} />
      <Route exact path="/SignUp" component={SignUpPage} />
    </LayoutPage>
  );
}

export default App;
