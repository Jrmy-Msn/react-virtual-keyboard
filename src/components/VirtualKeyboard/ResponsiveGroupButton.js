import React from 'react'
import {ButtonGroup, useMediaQuery} from "@material-ui/core"

const ResponsiveButtonGroup = ({...props}) => {
  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down("xs"))
  const isLargeScreen = useMediaQuery(theme => theme.breakpoints.up("lg"))
  props.size = isSmallScreen ? 'small' : (isLargeScreen ? 'large' : 'medium')
  return (
    <ButtonGroup {...props}>
      {props.children}
    </ButtonGroup>
  )
}

export default ResponsiveButtonGroup