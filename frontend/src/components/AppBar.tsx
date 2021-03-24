import React from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core/";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appBar: {
      padding: "0 20%",
    },
    menuButton: {
      marginRight: theme.spacing(2),
      color: "black",
    },
    title: {
      flexGrow: 1,
    },
    isActive: {
      color: "red !important",
    },
    navLink: {
      color: "white",
      textDecoration: "none",
    },
  })
);

export type AppBarProps = {
  loggedIn: Boolean;
  signOutMethod: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};

export default function ButtonAppBar(props: AppBarProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <NavLink
              exact
              to="/"
              activeClassName={classes.isActive}
              className={classes.navLink}
            >
              Home
            </NavLink>
          </Typography>
          {props.loggedIn ? (
            <NavLink
              to="/SignOut"
              activeClassName={classes.isActive}
              className={classes.navLink}
            >
              <Button color="inherit" onClick={props.signOutMethod}>
                Sign out
              </Button>
            </NavLink>
          ) : (
            <>
              <NavLink
                to="/SignIn"
                activeClassName={classes.isActive}
                className={classes.navLink}
              >
                <Button color="inherit">Sign in</Button>
              </NavLink>
              <NavLink
                to="/SignUp"
                activeClassName={classes.isActive}
                className={classes.navLink}
              >
                <Button color="inherit">Sign up</Button>
              </NavLink>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
