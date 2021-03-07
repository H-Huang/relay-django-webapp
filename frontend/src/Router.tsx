// Router.tsx
import { BrowserRouter, Route, Link } from "react-router-dom";
import { RouteComponentProps, withRouter } from "react-router";

import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Link to="/SignIn">Sign In</Link>
      <Link to="/SignUp">Sign Up</Link>
      <Route exact path="/SignIn" component={SignIn} />
      <Route exact path="/SignUp" component={SignUp} />
    </BrowserRouter>
  );
}
