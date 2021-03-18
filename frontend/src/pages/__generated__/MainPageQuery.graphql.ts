/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type MainPageQueryVariables = {};
export type MainPageQueryResponse = {
    readonly allIngredients: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly name: string;
            } | null;
        } | null>;
    } | null;
    readonly allUsers: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly username: string;
            } | null;
        } | null>;
    } | null;
};
export type MainPageQuery = {
    readonly response: MainPageQueryResponse;
    readonly variables: MainPageQueryVariables;
};



/*
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
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "IngredientNodeConnection",
    "kind": "LinkedField",
    "name": "allIngredients",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "IngredientNodeEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "IngredientNode",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "UserTypeConnection",
    "kind": "LinkedField",
    "name": "allUsers",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "UserTypeEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "UserType",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "username",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MainPageQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MainPageQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ac97d0cb70e695d100ae487c849e5426",
    "id": null,
    "metadata": {},
    "name": "MainPageQuery",
    "operationKind": "query",
    "text": "query MainPageQuery {\n  allIngredients {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n  allUsers {\n    edges {\n      node {\n        id\n        username\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a0383fc16f90ecc5d6519bdf0cbfdb93';
export default node;
