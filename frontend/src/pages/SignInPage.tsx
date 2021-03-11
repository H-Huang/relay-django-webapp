import React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@material-ui/core";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import graphql from "babel-plugin-relay/macro";
import { commitMutation, commitLocalUpdate, Environment } from "react-relay";
import environment from "../RelayEnvironment";

import type {
  ObtainJSONWebTokenInput,
  SignInPageMutationVariables,
  SignInPageMutation,
} from "./__generated__/SignInPageMutation.graphql";

import useStyles from "./SignInPage.css";
import { useHistory } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";

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

let tempID = 0;

function createToken(token: String) {
  commitLocalUpdate(environment, (store) => {
    console.log(store.getRoot());
    const user = store.getRoot().getLinkedRecord("viewer");
    const userNoteRecords = user?.getLinkedRecords("notes");

    // Create a unique ID.
    const dataID = `client:Note:${tempID++}`;

    // Remove the note from the list of user notes.
    const newUserNoteRecords = userNoteRecords?.filter(
      (x) => x.getDataID() !== dataID
    );
    // Delete the note from the store.
    store.delete(dataID);
    // Set the new list of notes.
    user?.setLinkedRecords(newUserNoteRecords, "notes");
  });
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  const history = useHistory();

  const [state, setState] = React.useState<ObtainJSONWebTokenInput>({
    username: "",
    password: "",
  });
  const classes = useStyles();

  function signIn(
    environment: Environment,
    variables: SignInPageMutationVariables
  ) {
    console.log(variables);
    commitMutation<SignInPageMutation>(environment, {
      mutation,
      variables,
      onCompleted: (response, errors) => {
        console.log("Response received from server.");
        console.log(response);
        console.log(errors);
        if (response?.tokenAuth) {
          localStorage.setItem(AUTH_TOKEN, response.tokenAuth.token);
          history.push("/main");
        }
      },
      onError: (err) => console.error(err),
    });
  }

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
            }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
