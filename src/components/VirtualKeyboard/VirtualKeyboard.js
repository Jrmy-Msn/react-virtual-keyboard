import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { KeyboardIcon, PaletteIcon } from 'react-line-awesome'

import 'react-line-awesome/src/resources/line-awesome/css/line-awesome.min.css'
import './VirtualKeyboard.css'

import VirtualKey from '../VirtualKey/VirtualKey'

const TAG = '[VirtualKeyboard]'
function log(...args) {
  console.log(`%c${TAG} %c${args.join(' ')}`, `font:bold 1em sans-serif;color:${'#35a2bf'}`, '')
}

export const KEYBOARD_THEME = {
  DARK: 'dark',
  LIGHT: 'light'
}

const KEYBOARD_LAYOUT = {
  AZERTY: ['AZERTYUIOP', 'QSDFGHJKLM', 'WXCVBN'],
  QWERTY: ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'],
  ALPHABET: ['ABCDEFGHIJ', 'KLMNOPQRST', 'UVWXYZ']
}

function nextInArray(value, array) {
  const aKey = Object.keys(array)
  let index = aKey.findIndex(k => value === array[k])
  index = (index < 0 || index === aKey.length - 1) ? 0 : index + 1
  return array[aKey[index]]
}

class VirtualKeyboard extends Component {
  static propTypes = {
    layout: PropTypes.arrayOf(PropTypes.string), // keyboard layout
    theme: PropTypes.string, // keyboard color theme
    currentKey: PropTypes.string, // if not empty string, current virtual key selected
    onKeyUp: PropTypes.func, // (KeyboardEvent) => void : keyup physical keyboard event handler
    onKeyDown: PropTypes.func, // (KeyboardEvent) => void : keydown physical keyboard event handler
    onClickKey: PropTypes.func, // (string) => void : mouse click on virtual key event handler
    onMouseOverForKey: PropTypes.func, // (string) => void : mouse over on virtual key event handler
    onMouseOutForKey: PropTypes.func, // (string) => void : mouse out on virtual key event handler
    feedbackForCurrentKey: PropTypes.func, // (string) =>  string : define a CSS classname
  }

  static defaultProps = {
    theme: KEYBOARD_THEME.DARK,
    layout: KEYBOARD_LAYOUT.ALPHABET,
    onKeyDown: (ev) => log('onKeyDown', 'Please provide a behavior', `[DOWN key "${ev.key.toUpperCase()}"]`),
    onKeyUp: (ev) => log('onKeyUp', 'Please provide a behavior', `[UP key "${ev.key.toUpperCase()}"]`),
    onClickForKey: (vKey) => log('onClickForKey', 'Please provide a behavior', `[CLICK key "${vKey.toUpperCase()}"]`),
    onMouseOverForKey: (vKey) => log('onMouseOverForKey', 'Please provide a behavior', `[MOUSE OVER key "${vKey.toUpperCase()}"]`),
    onMouseOutForKey: (vKey) => log('onMouseOutForKey', 'Please provide a behavior', `[MOUSE OUT key "${vKey.toUpperCase()}"]`),
    feedbackForKey: '',
    feedbackForCurrentKey: () => void undefined
  }

  state = {
    theme: this.props.theme,
    layout: this.props.layout,
    currentKey: ''
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.onKeyDown)
    document.body.addEventListener('keyup', this.onKeyUp)
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.onKeyDown)
    document.body.removeEventListener('keyup', this.onKeyUp)
  }

  detectKeyboardType() {
    const {layout} = this.state
    return layout || VirtualKeyboard.defaultProps.layout
  }

  // arrow func for binding this
  onKeyDown = (ev) => {
    const keyboardLayout = this.detectKeyboardType().join('')
    const key = ev.key &&  ev.key.toUpperCase()
    if (keyboardLayout.includes(key)) {
      // default behavior
      this.setState({currentKey: key || ''})
      // custom behavior
      this.props.onKeyDown(ev)
    }
  }

  // arrow func for binding this
  onKeyUp = (ev) => {
    const {currentKey} = this.state
    // default behavior
    this.setState({currentKey: ''})
    // custom behavior
    this.props.onKeyUp(ev)
  }

  // arrow func for binding this
  switchType = () => {
    const {layout} = this.state
    const next = nextInArray(layout, KEYBOARD_LAYOUT)
    this.setState({layout: next})
  }

  // arrow func for binding this
  switchTheme = () => {
    const {theme} = this.state
    const next = nextInArray(theme, KEYBOARD_THEME)
    this.setState({theme: next})
  }

  render() {
    const {theme} = this.state
    const {feedbackForCurrentKey, onClickForKey, onMouseOverForKey, onMouseOutForKey} = this.props
    return (
      <div
        role="widget"
        aria-label="Clavier virtuel"
        aria-owns=".VirtualKey"
        className={`VirtualKeyboard`}
        theme={theme}>
        <div className="virtual-keyboard-action">
          <KeyboardIcon
            aria-hidden="false"
            role="button"
            aria-label="Changer la disposition du clavier"
            className={`la-lg`}
            onClick={this.switchType} />
          <PaletteIcon
            aria-hidden="false"
            role="button"
            aria-label="Changer la couleur du clavier"
            className={`la-lg`}
            onClick={this.switchTheme} />
        </div>
        <div className={`virtual-keyboard-letters`}>
          {
            this.detectKeyboardType().map((letterRow, index) => (
              <div key={index} className={`virtual-keyboard-row`}>
                {
                  letterRow.split('').map(vKey => (
                    <VirtualKey
                      key={vKey}
                      value={vKey}
                      onClick={onClickForKey}
                      onMouseOver={onMouseOverForKey}
                      onMouseOut={onMouseOutForKey}
                      feedback={feedbackForCurrentKey(vKey)}/>
                  ))
                }
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default VirtualKeyboard