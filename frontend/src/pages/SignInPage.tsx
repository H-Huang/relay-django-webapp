import React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import graphql from "babel-plugin-relay/macro";
import { commitMutation, Environment } from "react-relay";

import environment from "../RelayEnvironment";
import { Link } from "react-router-dom";

import type {
  ObtainJSONWebTokenInput,
  SignInPageMutationVariables,
  SignInPageMutation,
} from "./__generated__/SignInPageMutation.graphql";

import { AUTH_TOKEN, history } from "../utils";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const mutation = graphql`
  mutation SignInPageMutation($input: ObtainJSONWebTokenInput!) {
    tokenAuth(input: $input) {
      payload
      refreshExpiresIn
      clientMutationId
      token
    }
  }
`;

export function signIn(
  environment: Environment,
  variables: SignInPageMutationVariables
) {
  commitMutation<SignInPageMutation>(environment, {
    mutation,
    variables,
    onCompleted: (response, errors) => {
      // console.log("Response received from server.");
      // console.log(response);
      // console.log(errors);
      if (response?.tokenAuth) {
        localStorage.setItem(AUTH_TOKEN, response.tokenAuth.token);
      }
    },
    onError: (err) => console.error(err),
    updater: (store) => {
      const token = store.getRootField("tokenAuth").getValue("token");

      const newClientStore = store.create(token, "clientStore");
      newClientStore.setValue(token, "authToken");
      console.log(newClientStore);
      const root = store.getRoot();
      root.setLinkedRecord(newClientStore, "clientStore");
    },
  });
}

export default function SignIn() {
  const [state, setState] = React.useState<ObtainJSONWebTokenInput>({
    username: "",
    password: "",
  });
  const classes = useStyles();

  const handleChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>{/* <LockOutlinedIcon /> */}</Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="username"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => {
              e.preventDefault();
              signIn(environment, { input: state });
              history.push("/main");
            }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/SignUp">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
