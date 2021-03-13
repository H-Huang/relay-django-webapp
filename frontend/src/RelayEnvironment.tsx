import { Environment, Network, RecordSource, Store } from "relay-runtime";

async function fetchGraphQL(text: any, variables: any) {
  // Fetch data from GitHub's GraphQL API:
  const response = await fetch("http://localhost:8000/graphql", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Authorization: `bearer ${REACT_APP_GITHUB_AUTH_TOKEN}`,
    },
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
  return fetchGraphQL(params.text, variables);
}

const environment = new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource()),
});

export default environment;
