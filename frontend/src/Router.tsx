// Router.tsx
import { BrowserRouter, Route, Link } from "react-router-dom";
import { RouteComponentProps, withRouter } from "react-router";

import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";

import { AUTH_TOKEN } from "./constants";
import { useHistory } from "react-router-dom";

export default function Router() {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const history = useHistory();
  console.log(authToken);
  return (
    <BrowserRouter>
      {authToken === null ? (
        <div>
          <Link to="/SignIn">Sign In</Link>
          <Link to="/SignUp">Sign Up</Link>
        </div>
      ) : (
        <Link
          to="/SignOut"
          onClick={(e) => {
            e.preventDefault();
            localStorage.removeItem(AUTH_TOKEN);
            history.push("/main");
          }}
        >
          Sign Out
        </Link>
      )}
      <Route exact path="/SignIn" component={SignIn} />
      <Route exact path="/SignUp" component={SignUp} />
    </BrowserRouter>
  );
}
