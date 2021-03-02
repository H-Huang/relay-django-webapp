import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { RouteComponentProps, withRouter } from "react-router";

import graphql from "babel-plugin-relay/macro";
import { QueryRenderer } from "react-relay";
import environment from "./RelayEnvironment";

import Button from "@material-ui/core/Button";
import Router from "./Router";

import { AppQuery } from "./__generated__/AppQuery.graphql";

function App() {
  return (
    <div className="App">
      <Router />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <QueryRenderer<AppQuery>
        environment={environment}
        query={graphql`
          query AppQuery {
            allIngredients {
              edges {
                node {
                  id
                  name
                }
              }
            }
          }
        `}
        variables={{}}
        render={({ error, props }) => {
          if (error) {
            return <div>Error!</div>;
          }
          if (!props) {
            return <div>Loading...</div>;
          }
          console.log(props.allIngredients);
          // const ingredients: any = props?.allIngredients;
          return props.allIngredients?.edges.map((ingredient) => {
            return (
              <div>
                <h1 key={ingredient?.node?.id}>{ingredient?.node?.name}</h1>
                <Button variant="contained" color="primary">
                  Hello World
                </Button>
              </div>
            );
          });
          // return <div>User ID: {props.viewer.id}</div>;
        }}
      />
    </div>
  );
}

export default App;
