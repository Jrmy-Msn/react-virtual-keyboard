import React, {Component} from 'react'

import {THEME} from "./App.css.js";

import Keyboard from './components/VirtualKeyboard/VirtualKeyboard'

class App extends Component {
  state = {
    currentKey: '',
    inputValue: '',
  }

  onSelectVirtualKey(vKey) {
    const {inputValue} = this.state
    this.setState({inputValue: inputValue + vKey})
  }

  // arrow func for binding this
  isVirtualKeyActive = (vKey) => {
    const {currentKey} = this.state
    return vKey === currentKey
  }

  // arrow func for binding this
  handleClickForKey = (vKey) => {
    this.onSelectVirtualKey(vKey)
  }

  // arrow func for binding this
  handleMouseOverForKey = (vKey) => {
    this.setState({currentKey: vKey || ''})
  }

  // arrow func for binding this
  handleMouseOutForKey = () => {
    this.setState({currentKey: ''})
  }

  // arrow func for binding this
  handleKeyDown = (ev) => {
    const key = ev.key && ev.key.toUpperCase()
    this.setState({currentKey: key || ''})
  }

  // arrow func for binding this
  handleKeyUp = (ev) => {
    const key = ev.key && ev.key.toUpperCase()
    this.setState({currentKey: ''})
    this.onSelectVirtualKey(key)
  }

  render() {
    const {currentKey, inputValue} = this.state
    return (
      <div className="App">
        <Keyboard
          theme={THEME.light}
          currentKey={currentKey}
          onKeyDown={this.handleKeyDown}
          onKeyUp={this.handleKeyUp}
          onClickForKey={this.handleClickForKey}
          onMouseOverForKey={this.handleMouseOverForKey}
          onMouseOutForKey={this.handleMouseOutForKey}
          isKeyActive={this.isVirtualKeyActive}
        />
        <input id="app_input" type="text" value={inputValue} readOnly/>
      </div>
    )
  }
}

export default App
