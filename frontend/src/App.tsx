import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { RouteComponentProps, withRouter } from "react-router";

import graphql from "babel-plugin-relay/macro";
import Button from "@material-ui/core/Button";
import Router from "./Router";

import environment from "./RelayEnvironment";
// import type { PreloadedQuery } from "react-relay";
import type {
  AppQuery,
  AppQueryResponse,
} from "./__generated__/AppQuery.graphql";
const { loadQuery, usePreloadedQuery } = require("react-relay");

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
          username
          authToken
          notes {
            id
            title
            body
          }
        }
      }
    }
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
    <div className="App">
      <Router />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      {ingredients}
    </div>
  );
}

export default App;
