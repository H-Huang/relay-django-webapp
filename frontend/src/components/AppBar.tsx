import React from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core/";
import MenuIcon from "@material-ui/icons/Menu";
import { NavLink, Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      color: "black",
    },
    title: {
      flexGrow: 1,
    },
    isActive: {
      color: "red",
    },
  })
);

export type AppBarProps = {
  loggedIn: Boolean;
};

export default function ButtonAppBar(props: AppBarProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link to="/">Home</Link>
          </Typography>
          {props.loggedIn ? (
            <NavLink to="/SignOut" activeClassName={classes.isActive}>
              <Button color="inherit">Sign out</Button>
            </NavLink>
          ) : (
            <NavLink to="/SignIn" activeClassName={classes.isActive}>
              <Button color="inherit">Sign in</Button>
            </NavLink>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
