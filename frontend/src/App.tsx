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
const {
  loadQuery,
  usePreloadedQuery,
  commitLocalUpdate,
} = require("react-relay");

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
    allIngredients {
      edges {
        node {
          id
          name
        }
      }
    }
    allUsers {
      edges {
        node {
          id
          username
        }
      }
    }
    ...LayoutPageFragment_query
  }
`;

const appQueryReference = loadQuery(environment, query);

function App() {
  const data: AppQueryResponse = usePreloadedQuery(query, appQueryReference);
  console.log(data);

  const ingredients = data.allIngredients?.edges.map((ingredient) => {
    return (
      <div key={ingredient?.node?.id}>
        <h1>{ingredient?.node?.name}</h1>
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </div>
    );
  });
  console.log(ingredients);

  return (
    <LayoutPage clientStore={data}>
      <Route exact path="/" component={MainPage} />
      <Route exact path="/SignIn" component={SignInPage} />
      <Route exact path="/SignUp" component={SignUpPage} />
      {ingredients}
    </LayoutPage>
  );
}

export default App;
