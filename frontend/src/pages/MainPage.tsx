import React from "react";
import type { AppQuery as AppQueryType } from "../__generated__/AppQuery.graphql";
import AppQuery from "../__generated__/AppQuery.graphql";

import { usePreloadedQuery } from "react-relay";

export default function MainPage(props: any) {
  console.log("MAIN PAGE", props);

  const data = usePreloadedQuery<AppQueryType>(AppQuery, props.queryRef);
  console.log(data);
  return <h1>Main page</h1>;
}
