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

import { AUTH_TOKEN, history, redirectAndRefresh } from "../utils";
import { useFormik } from "formik";
import * as yup from "yup";

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
      redirectAndRefresh("/");
    },
    onError: (err) => console.error(err),
    updater: (store) => {
      // const token = store.getRootField("tokenAuth").getValue("token");
      // const newClientStore = store.create(token, "clientStore");
      // newClientStore.setValue(token, "authToken");
      // console.log(newClientStore);
      // const userInfo = store.getRoot().getLinkedRecord("whoami");
      // userInfo?.setLinkedRecord(newClientStore, "clientStore");
    },
  });
}

const validationSchema = yup.object({
  username: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required")
    .uppercase(),
  password: yup.string().required("Password is required").uppercase(),
});

export default function SignIn() {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      signIn(environment, { input: values });
    },
  });

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>{/* <LockOutlinedIcon /> */}</Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
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
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
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
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
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
