import React from 'react'
import PropTypes from 'prop-types'

import './VirtualKey.css'

const TAG = '[VirtualKey]'

const VirtualKey = ({value, feedback, onClick}) => {
  return (
    <div className={`VirtualKey ${feedback}`} onClick={() => onClick(value)}><b>{value}</b></div>
  )
}

VirtualKey.propTypes = {
  value: PropTypes.string.isRequired,
  feedback: PropTypes.string.isRequired,
  onClick: PropTypes.func
}

VirtualKey.defaultProps = {
  onClick: () => void undefined
}


export default VirtualKey