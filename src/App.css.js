import {createMuiTheme} from "@material-ui/core";

export const THEME = {
  dark: createMuiTheme({
    palette: {
      primary: {
        main: '#404040',
      },
      secondary: {
        main: '#c8b57d',
      }
    },
  }),

  light: createMuiTheme({
    palette: {
      primary: {
        main: '#ececec',
      },
      secondary: {
        main: '#c8b57d',
      }
    },
  }),
}