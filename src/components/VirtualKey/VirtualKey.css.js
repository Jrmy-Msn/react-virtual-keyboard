import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  root: {
    borderRight: 'none !important',
    borderRadius: 0,
    minWidth: 'inherit',
    flexGrow: 1
  },
  active({active}) {
    return active ? {
      backgroundColor: theme.palette.primary.dark
    } : {}
  }
}))