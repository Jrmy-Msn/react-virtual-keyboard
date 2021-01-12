import React from 'react'
import PropTypes from 'prop-types'

import './VirtualKey.css'

const TAG = '[VirtualKey]'

const VirtualKey = ({value, feedback, onClick}) => {
  return (
    <div
      role="button"
      aria-roledescription="Touche de clavier virtuel"
      aria-label={`Lettre ${value}`}
      className={`VirtualKey ${feedback}`}
      onClick={() => onClick(value)}>{value}</div>
  )
}

VirtualKey.propTypes = {
  value: PropTypes.string.isRequired,
  feedback: PropTypes.string,
  onClick: PropTypes.func.isRequired
}

VirtualKey.defaultProps = {
  onClick: () => void undefined,
  feedback: '',
}


export default VirtualKey