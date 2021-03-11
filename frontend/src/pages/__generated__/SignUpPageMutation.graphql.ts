/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type CreateUserInput = {
    password: string;
    email: string;
    clientMutationId?: string | null;
};
export type SignUpPageMutationVariables = {
    input: CreateUserInput;
};
export type SignUpPageMutationResponse = {
    readonly createUser: {
        readonly user: {
            readonly id: string;
        } | null;
    } | null;
};
export type SignUpPageMutation = {
    readonly response: SignUpPageMutationResponse;
    readonly variables: SignUpPageMutationVariables;
};



/*
mutation SignUpPageMutation(
  $input: CreateUserInput!
) {
  createUser(input: $input) {
    user {
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "CreateUserPayload",
    "kind": "LinkedField",
    "name": "createUser",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "UserType",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SignUpPageMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SignUpPageMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d37e9e13736e9fa77abc4e309382e5ab",
    "id": null,
    "metadata": {},
    "name": "SignUpPageMutation",
    "operationKind": "mutation",
    "text": "mutation SignUpPageMutation(\n  $input: CreateUserInput!\n) {\n  createUser(input: $input) {\n    user {\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '9f3f0ade27289d96af5e57a19b6ff663';
export default node;
