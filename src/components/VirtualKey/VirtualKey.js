import React from 'react'
import PropTypes from 'prop-types'

import {useStyles} from "./VirtualKey.css.js";
import {Button} from "@material-ui/core";

const TAG = '[VirtualKey]'

const VirtualKey = ({value, active, onClick, onMouseOver, onMouseOut, ...other}) => {
  const classes = useStyles({active});
  return (
    <Button
      {...other}
      color={'primary'}
      variant={'contained'}
      className={`VirtualKey ${other.className} ${classes.active}`}
      aria-label={`${typeof value === 'string' ? value : ''}`}
      classes={{root: classes.root}}
      onMouseOut={() => onMouseOut(value)}
      onMouseOver={() => onMouseOver(value)}
      onClick={() => onClick(value)}>{value}</Button>
  )
}

VirtualKey.propTypes = {
  value: PropTypes.any.isRequired,
  feedback: PropTypes.string,
  onClick: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
}

VirtualKey.defaultProps = {
  onClick: () => void undefined,
  onMouseOver: () => void undefined,
  onMouseOut: () => void undefined,
  feedback: '',
}


export default VirtualKey