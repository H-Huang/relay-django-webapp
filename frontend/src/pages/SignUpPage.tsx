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
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import graphql from "babel-plugin-relay/macro";
import { commitMutation, Environment } from "react-relay";
import environment from "../RelayEnvironment";
import { signIn } from "./SignInPage";
import { history } from "../utils";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

import {
  CreateUserInput,
  SignUpPageMutationVariables,
} from "./__generated__/SignUpPageMutation.graphql";
import type { ObtainJSONWebTokenInput } from "./__generated__/SignInPageMutation.graphql";
import { useSnackbar, withSnackbar } from "notistack";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const mutation = graphql`
  mutation SignUpPageMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      user {
        id
      }
    }
  }
`;

function signUp(
  environment: Environment,
  variables: SignUpPageMutationVariables,
  enqueueSnackbar?: any
) {
  console.log(variables);
  commitMutation(environment, {
    mutation,
    variables,
    onCompleted: (response, errors) => {
      console.log("Response received from server.");
      console.log(response);
      console.log(errors);
      if (errors && enqueueSnackbar) {
        for (let error of errors) {
          enqueueSnackbar(error.message, { variant: "error" });
        }
      } else {
        const loginInfo: ObtainJSONWebTokenInput = {
          username: variables.input.email,
          password: variables.input.password,
        };
        signIn(environment, { input: loginInfo });
      }
    },
    onError: (err) => console.error(err),
  });
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required")
    .uppercase(),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(26, "Password cannot be more than 26 characters")
    .required("Password is required")
    .uppercase(),
});

function SignUp() {
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      signUp(environment, { input: values }, enqueueSnackbar);
    },
  });

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>{/* <LockOutlinedIcon /> */}</Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/SignIn">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default withSnackbar(SignUp);
