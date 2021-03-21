import { createBrowserHistory } from "history";
import type { Path } from "history";

export const history = createBrowserHistory();

export const AUTH_TOKEN = "AUTH_TOKEN";

export const redirectAndRefresh = (route: Path) => {
  history.push(route);
  history.go(0);
};
