import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          margin: 0,
        },
      },
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});
