/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type RouterFragment_query = {
    readonly clientStore: {
        readonly authToken: string | null;
    } | null;
    readonly " $refType": "RouterFragment_query";
};
export type RouterFragment_query$data = RouterFragment_query;
export type RouterFragment_query$key = {
    readonly " $data"?: RouterFragment_query$data;
    readonly " $fragmentRefs": FragmentRefs<"RouterFragment_query">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RouterFragment_query",
  "selections": [
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
  ],
  "type": "Query",
  "abstractKey": null
};
(node as any).hash = '7d8f073d6d7db7f946b44fa98da8c621';
export default node;
