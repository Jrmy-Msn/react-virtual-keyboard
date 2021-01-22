import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  root: {
    borderRight: 'none !important',
    borderRadius: 0,
    minWidth: 'inherit',
  },
  active({active}) {
    return {
      backgroundColor: active
        ? theme.palette.primary.dark
        : 'inherit'
    }
  }
}))