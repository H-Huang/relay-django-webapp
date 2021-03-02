// Router.tsx
import { BrowserRouter, Route } from "react-router-dom";
import { RouteComponentProps, withRouter } from "react-router";

import SignIn from "./pages/SignInPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Route exact path="/SignIn" component={SignIn} />
    </BrowserRouter>
  );
}
