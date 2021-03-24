import { Environment, Network, RecordSource, Store } from "relay-runtime";
import { AUTH_TOKEN } from "./utils";

import { v4 as uuidv4 } from "uuid";
import { RecordSourceProxy } from "relay-runtime";
import { commitLocalUpdate } from "react-relay";

async function fetchGraphQL(text: any, variables: any) {
  let headers: any = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  // Create user mutation fails with error "Error decoding signature graphql" when
  // using Authorization header without a JWT
  const token = localStorage.getItem(AUTH_TOKEN);
  if (token) {
    headers.Authorization = `JWT ${token}`;
  }
  const response = await fetch("http://localhost:8000/graphql", {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: text,
      variables,
    }),
  });

  // Get the response as JSON
  return await response.json();
}

async function fetchRelay(params: { name: any; text: any }, variables: any) {
  console.log(
    `fetching query ${params.name} with ${JSON.stringify(variables)}`
  );
  console.log(localStorage.getItem(AUTH_TOKEN));
  return fetchGraphQL(params.text, variables);
}

const environment = new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource()),
});

// initial local state
// commitLocalUpdate(environment, (store: RecordSourceProxy) => {
//   console.log(store);
//   // const clientStore = store.getRoot().getLinkedRecord("clientStore");
//   const token = localStorage.getItem(AUTH_TOKEN);
//   const newClientStore = store.create(uuidv4(), "clientStore");
//   newClientStore.setValue(token, "authToken");
//   const userInfo = store.getRoot().getLinkedRecord("whoami");
//   console.log(userInfo);
//   userInfo?.setLinkedRecord(newClientStore, "clientStore");
// });

export default environment;
