/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AppQueryVariables = {};
export type AppQueryResponse = {
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
    readonly " $fragmentRefs": FragmentRefs<"LayoutPageFragment_query">;
};
export type AppQuery = {
    readonly response: AppQueryResponse;
    readonly variables: AppQueryVariables;
};



/*
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
v1 = {
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
v2 = {
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
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AppQuery",
    "selections": [
      (v1/*: any*/),
      (v2/*: any*/),
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "LayoutPageFragment_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AppQuery",
    "selections": [
      (v1/*: any*/),
      (v2/*: any*/),
      {
        "kind": "ClientExtension",
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ClientStore",
            "kind": "LinkedField",
            "name": "clientStore",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "authToken",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "9a165171f033bae87befe3cbc93e4f75",
    "id": null,
    "metadata": {},
    "name": "AppQuery",
    "operationKind": "query",
    "text": "query AppQuery {\n  allIngredients {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n  allUsers {\n    edges {\n      node {\n        id\n        username\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '32b048de909c16f6628de2dba1fc3bd8';
export default node;
