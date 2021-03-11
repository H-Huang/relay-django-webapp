/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ObtainJSONWebTokenInput = {
    clientMutationId?: string | null;
    username: string;
    password: string;
};
export type SignInPageMutationVariables = {
    input: ObtainJSONWebTokenInput;
};
export type SignInPageMutationResponse = {
    readonly tokenAuth: {
        readonly payload: unknown;
        readonly refreshExpiresIn: number;
        readonly clientMutationId: string | null;
        readonly token: string;
    } | null;
};
export type SignInPageMutation = {
    readonly response: SignInPageMutationResponse;
    readonly variables: SignInPageMutationVariables;
};



/*
mutation SignInPageMutation(
  $input: ObtainJSONWebTokenInput!
) {
  tokenAuth(input: $input) {
    payload
    refreshExpiresIn
    clientMutationId
    token
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
    "concreteType": "ObtainJSONWebTokenPayload",
    "kind": "LinkedField",
    "name": "tokenAuth",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "payload",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "refreshExpiresIn",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "clientMutationId",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "token",
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
    "name": "SignInPageMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SignInPageMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "586b1aceafd79e92400c886f3cfa4e85",
    "id": null,
    "metadata": {},
    "name": "SignInPageMutation",
    "operationKind": "mutation",
    "text": "mutation SignInPageMutation(\n  $input: ObtainJSONWebTokenInput!\n) {\n  tokenAuth(input: $input) {\n    payload\n    refreshExpiresIn\n    clientMutationId\n    token\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f46da1af527a10098ec4ef900b748f60';
export default node;
