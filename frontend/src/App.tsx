import React from "react";
import { Route } from "react-router-dom";

import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import MainPage from "./pages/MainPage";
import LayoutPage from "./pages/LayoutPage";
// import Button from "@material-ui/core/Button";

import environment from "./RelayEnvironment";
import type { AppQuery as AppQueryType } from "./__generated__/AppQuery.graphql";
import graphql from "babel-plugin-relay/macro";
import { loadQuery, usePreloadedQuery } from "react-relay";

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
  const data = usePreloadedQuery<AppQueryType>(query, appQueryReference);
  console.log(data);
  // const [, loadMainPageQuery] = useQueryLoader<AppQueryType>(query);

  return (
    <LayoutPage clientStore={data}>
      {/* <Button
        onClick={() => {
          loadMainPageQuery({});
          history.push("/main");
        }}
      >
        click me to go to main manually
      </Button> */}
      <Route exact path="/" render={(props) => <MainPage {...props} />} />
      <Route exact path="/SignIn" component={SignInPage} />
      <Route exact path="/SignUp" component={SignUpPage} />
    </LayoutPage>
  );
}

export default App;
