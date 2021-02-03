import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Button,
  createMuiTheme,
  Grid,
  ThemeProvider,
  withStyles
} from "@material-ui/core"
import { KeyboardIcon } from 'react-line-awesome'

import 'react-line-awesome/src/resources/line-awesome/css/line-awesome.min.css'
import {usedStyle} from "./VirtualKeyboard.css.js";

import VirtualKey from '../VirtualKey/VirtualKey'
import ResponsiveButtonGroup from "./ResponsiveGroupButton"

const TAG = '[VirtualKeyboard]'

function log(...args) {
  console.log(`%c${TAG} %c${args.join(' ')}`, `font:bold 1em sans-serif;color:${'#35a2bf'}`, '')
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
    theme: PropTypes.object, // keyboard color theme
    onKeyUp: PropTypes.func, // (KeyboardEvent) => void : keyup physical keyboard event handler
    onKeyDown: PropTypes.func, // (KeyboardEvent) => void : keydown physical keyboard event handler
    onClickKey: PropTypes.func, // (string) => void : mouse click on virtual key event handler
    onMouseOverForKey: PropTypes.func, // (string) => void : mouse over on virtual key event handler
    onMouseOutForKey: PropTypes.func, // (string) => void : mouse out on virtual key event handler
    isKeyActive: PropTypes.func, // (string) =>  string : define a CSS classname
    feedbackForCurrentKey: PropTypes.func, // (string) =>  string : define a CSS classname
  }

  static defaultProps = {
    layout: KEYBOARD_LAYOUT.ALPHABET,
    onKeyDown: (ev) => log('onKeyDown', 'Please provide a behavior', `[DOWN key "${ev.key.toUpperCase()}"]`),
    onKeyUp: (ev) => log('onKeyUp', 'Please provide a behavior', `[UP key "${ev.key.toUpperCase()}"]`),
    onClickForKey: (vKey) => log('onClickForKey', 'Please provide a behavior', `[CLICK key "${vKey.toUpperCase()}"]`),
    onMouseOverForKey: (vKey) => log('onMouseOverForKey', 'Please provide a behavior', `[MOUSE OVER key "${vKey.toUpperCase()}"]`),
    onMouseOutForKey: (vKey) => log('onMouseOutForKey', 'Please provide a behavior', `[MOUSE OUT key "${vKey.toUpperCase()}"]`),
    isKeyActive: () => void undefined,
    feedbackForCurrentKey: () => void undefined,
  }

  state = {
    layout: this.props.layout,
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
    const key = ev.key ? ev.key.toUpperCase() : null
    if (key && keyboardLayout.includes(key)) {
      // custom behavior
      this.props.onKeyDown(ev)
    }
  }

  // arrow func for binding this
  onKeyUp = (ev) => {
    const keyboardLayout = this.detectKeyboardType().join('')
    const key = ev.key ? ev.key.toUpperCase() : null
    if (key && keyboardLayout.includes(key)) {
      // custom behavior
      this.props.onKeyUp(ev)
    }
  }

  // arrow func for binding this
  switchType = () => {
    const {layout} = this.state
    const next = nextInArray(layout, KEYBOARD_LAYOUT)
    this.setState({layout: next})
  }

  render() {
    const {classes, feedbackForCurrentKey, isKeyActive, onClickForKey, onMouseOverForKey, onMouseOutForKey, ...other} = this.props
    return (
      <ThemeProvider theme={this.props.theme ? this.props.theme : createMuiTheme()}>
        <Box bgcolor={'primary.main'} {...other}>
          <Grid container
                aria-label="clavier"
                aria-owns=".VirtualKey"
                className={`VirtualKeyboard`}>
            <Grid item xs={12}>
              <Button
                aria-label="disposition"
                fullWidth={true}
                size={'small'}
                disableElevation={true}
                color={'secondary'}
                classes={{root: classes.root}}
                variant={'contained'}
                onClick={this.switchType}
                startIcon={<KeyboardIcon className={`la-lg`}/>}>Disposition</Button>
            </Grid>
            {
              this.detectKeyboardType().map((letterRow, index, arr) => (
                <Grid container item xs={12}
                      key={index}
                      justify={'center'}>
                  <ResponsiveButtonGroup
                    disableElevation={true}
                    size={'small'}
                    className={`${classes.key}`}
                    variant="contained"
                    color="primary">
                    {
                      letterRow.split('').map(vKey => (
                        <VirtualKey
                          key={vKey}
                          value={vKey}
                          onClick={onClickForKey}
                          className={`${feedbackForCurrentKey(vKey)}`}
                          onMouseOver={onMouseOverForKey}
                          onMouseOut={onMouseOutForKey}
                          active={isKeyActive(vKey)}/>
                      ))
                    }</ResponsiveButtonGroup>
                </Grid>
              ))
            }
          </Grid>
        </Box>
      </ThemeProvider>
    )
  }
}

export default withStyles(usedStyle, { withTheme: true })(VirtualKeyboard)