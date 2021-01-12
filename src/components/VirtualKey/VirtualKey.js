import React from 'react'
import PropTypes from 'prop-types'

import './VirtualKey.css'

const TAG = '[VirtualKey]'

const VirtualKey = ({value, feedback, onClick, onMouseOver, onMouseOut}) => {
  return (
    <div
      role="button"
      aria-roledescription="Touche de clavier virtuel"
      aria-label={`Lettre ${typeof value === 'string' ? value : ''}`}
      className={`VirtualKey ${feedback}`}
      onMouseOut={() => onMouseOut(value)}
      onMouseOver={() => onMouseOver(value)}
      onClick={() => onClick(value)}>{value}</div>
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