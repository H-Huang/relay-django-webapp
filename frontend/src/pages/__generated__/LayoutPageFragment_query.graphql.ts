/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type LayoutPageFragment_query = {
    readonly clientStore: {
        readonly authToken: string | null;
    } | null;
    readonly " $refType": "LayoutPageFragment_query";
};
export type LayoutPageFragment_query$data = LayoutPageFragment_query;
export type LayoutPageFragment_query$key = {
    readonly " $data"?: LayoutPageFragment_query$data;
    readonly " $fragmentRefs": FragmentRefs<"LayoutPageFragment_query">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LayoutPageFragment_query",
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
(node as any).hash = '93695768c3732893a77f4f6b10d3caeb';
export default node;
