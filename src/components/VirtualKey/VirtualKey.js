import React from 'react'
import PropTypes from 'prop-types'

import './VirtualKey.css'

const TAG = '[VirtualKey]'

const VirtualKey = ({value, feedback, onClick, onMouseOver}) => {
  return (
    <div
      role="button"
      aria-roledescription="Touche de clavier virtuel"
      aria-label={`Lettre ${value}`}
      className={`VirtualKey ${feedback}`}
      onMouseOver={() => onMouseOver(value)}
      onClick={() => onClick(value)}>{value}</div>
  )
}

VirtualKey.propTypes = {
  value: PropTypes.string.isRequired,
  feedback: PropTypes.string,
  onClick: PropTypes.func,
  onMouseOver: PropTypes.func,
}

VirtualKey.defaultProps = {
  onClick: () => void undefined,
  onMouseOver: () => void undefined,
  feedback: '',
}


export default VirtualKey