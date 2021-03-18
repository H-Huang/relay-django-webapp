import React from "react";
import type { MainPageQuery as MainPageQueryType } from "./__generated__/MainPageQuery.graphql";

import Button from "@material-ui/core/Button";

import graphql from "babel-plugin-relay/macro";
import {
  loadQuery,
  usePreloadedQuery,
  useQueryLoader,
  commitLocalUpdate,
  useLazyLoadQuery,
} from "react-relay";
import { useHistory } from "react-router-dom";

const query = graphql`
  query MainPageQuery {
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
  }
`;

export default function MainPage(props: any) {
  const data = useLazyLoadQuery<MainPageQueryType>(query, {});

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
    <div>
      <h1>Main page</h1>
      {ingredients}
    </div>
  );
}
