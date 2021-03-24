import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/";

import type { MainPageFragment_query$key } from "./__generated__/MainPageFragment_query.graphql";

import Button from "@material-ui/core/Button";

import graphql from "babel-plugin-relay/macro";
import { useLazyLoadQuery, useFragment } from "react-relay";

const fragment = graphql`
  fragment MainPageFragment_query on Query {
    whoami {
      id
      username
      email
      dateJoined
    }
  }
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
    },
  })
);

type Props = {
  data?: any;
};

export default function MainPage(props: Props) {
  const classes = useStyles();
  //   console.log(data);
  //   const ingredients = data.allIngredients?.edges.map((ingredient) => {
  //     return (
  //       <div key={ingredient?.node?.id}>
  //         <h1>{ingredient?.node?.name}</h1>
  //         <Button variant="contained" color="primary">
  //           Hello World
  //         </Button>
  //       </div>
  //     );
  //   });
  //   console.log(ingredients);
  const data = props?.data?.whoami;

  let userInfo = null;
  if (data) {
    userInfo = [];
    for (const key in data) {
      userInfo.push(
        <p key={key}>
          {key} : {data[key]}
        </p>
      );
    }
  }

  return (
    <div className={classes.root}>
      {userInfo ? (
        <h1>User info: {userInfo}</h1>
      ) : (
        <h1>Sign up or sign in to see user info</h1>
      )}
    </div>
  );
}
