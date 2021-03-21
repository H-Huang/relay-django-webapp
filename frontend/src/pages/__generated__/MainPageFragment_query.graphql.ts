/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MainPageFragment_query = {
    readonly whoami: {
        readonly id: string;
        readonly username: string;
        readonly email: string;
        readonly dateJoined: unknown;
    } | null;
    readonly " $refType": "MainPageFragment_query";
};
export type MainPageFragment_query$data = MainPageFragment_query;
export type MainPageFragment_query$key = {
    readonly " $data"?: MainPageFragment_query$data;
    readonly " $fragmentRefs": FragmentRefs<"MainPageFragment_query">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MainPageFragment_query",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "UserType",
      "kind": "LinkedField",
      "name": "whoami",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "username",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "email",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "dateJoined",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
(node as any).hash = 'b86ff37e2f2faa87fc99ab241864539f';
export default node;
