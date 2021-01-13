import React from 'react'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'

import VirtualKeyboard from "./VirtualKeyboard"
import VirtualKey from "../VirtualKey/VirtualKey";

describe('VirtualKeyboard Component Render', () => {
  it('should display 26 <VirtualKey /> component', () => {
    const wrapper = shallow(<VirtualKeyboard />)
    const aKeys = wrapper.find('VirtualKey')
    expect(aKeys).toHaveLength(26)
  })

  it('should display X <VirtualKey /> component based on number of letter in "layout prop', () => {
    let wrapper = shallow(<VirtualKeyboard layout={['JRMY', 'MSN']} />)
    let aKeys = wrapper.find('VirtualKey')
    expect(aKeys).toHaveLength(7)

    wrapper = shallow(<VirtualKeyboard layout={null} />)
    aKeys = wrapper.find('VirtualKey')
    expect(aKeys).toHaveLength(26)
  })

  it('should <VirtualKey /> component with "currentKey" prop as "value" prop have a "feedback" prop', () => {
    const feedbackForCurrentKey = jest.fn()
    feedbackForCurrentKey.mockImplementation((p) => p === 'J' ? 'pressed' : '')
    const wrapper = shallow(<VirtualKeyboard currentKey={'J'} feedbackForCurrentKey={feedbackForCurrentKey} />)
    const vKey = wrapper
      .find('VirtualKey')
      .filterWhere(w => w.dive().hasClass('pressed'))
    expect(vKey.dive().filter('.pressed')).toHaveLength(1)
  })

  it('should call "onKeyDown" prop after start pressed a physical key', () => {
    const onKeyDown = jest.fn()
    const wrapper = shallow(<VirtualKeyboard onKeyDown={onKeyDown}/>)
    document.body.dispatchEvent(new KeyboardEvent('keydown', {key: 'j'}))
    expect(onKeyDown).toHaveBeenCalledTimes(1)
    document.body.dispatchEvent(new KeyboardEvent('keydown', {key: ''}))
    expect(onKeyDown).toHaveBeenCalledTimes(1)
  })

  it('should call "onKeyUp" prop after finish pressed a physical key', () => {
    const onKeyUp = jest.fn()
    const wrapper = shallow(<VirtualKeyboard onKeyUp={onKeyUp}/>)
    document.body.dispatchEvent(new KeyboardEvent('keyup', {key: 'j'}))
    expect(onKeyUp).toHaveBeenCalledTimes(1)
  })

  it('should call "onClickForKey" prop when clicked on <VirtualKey />', () => {
    const onClickForKey = jest.fn()
    const wrapper = shallow(<VirtualKeyboard onClickForKey={onClickForKey}/>)
    wrapper.find('VirtualKey').first().simulate('click')
    expect(onClickForKey).toHaveBeenCalledTimes(1)
  })

  it('should call "onMouseOverForKey" prop when clicked on <VirtualKey />', () => {
    const onMouseOverForKey = jest.fn()
    const wrapper = shallow(<VirtualKeyboard onMouseOverForKey={onMouseOverForKey}/>)
    wrapper.find('VirtualKey').first().simulate('mouseover')
    expect(onMouseOverForKey).toHaveBeenCalledTimes(1)
  })

  it('should call "onMouseOutForKey" prop when clicked on <VirtualKey />', () => {
    const onMouseOutForKey = jest.fn()
    const wrapper = shallow(<VirtualKeyboard onMouseOutForKey={onMouseOutForKey}/>)
    wrapper.find('VirtualKey').first().simulate('mouseout')
    expect(onMouseOutForKey).toHaveBeenCalledTimes(1)
  })

  it('should call "feedbackForCurrentKey" prop for each <VirtualKey /> component', () => {
    const feedbackForCurrentKey = jest.fn()
    feedbackForCurrentKey.mockImplementation(() => 'pressed')
    const wrapper = shallow(<VirtualKeyboard feedbackForCurrentKey={feedbackForCurrentKey}/>)
    const aKeys = wrapper.find('VirtualKey')
    expect(feedbackForCurrentKey).toHaveBeenCalledTimes(aKeys.length)
  })

// it('should call "switchType" func', () => {
//   const wrapper = shallow(<VirtualKeyboard />)
//   const switchTypeFunc = jest.spyOn(wrapper.instance(), 'switchType')
//   wrapper.update()
//   const typeButton = wrapper.find('[aria-label="Changer la disposition du clavier"]')
//   typeButton.simulate('click')
//   expect(switchTypeFunc).toBeCalledTimes(1)
// })

// it('should call "switchTheme" func', () => {
//   const wrapper = shallow(<VirtualKeyboard />)
//   const switchThemeFunc = jest.spyOn(wrapper.instance(), 'switchTheme')
//   wrapper.update()
//   const typeButton = wrapper.find('[aria-label="Changer la couleur du clavier"]')
//   typeButton.simulate('click')
//   expect(switchThemeFunc).toBeCalledTimes(1)
// })

  it('renders correctly', () => {
    const tree = renderer
      .create(<VirtualKeyboard />)
      .toJSON();
    expect(tree).toMatchSnapshot()
  })
})


describe('VirtualKeyboard Default prop', () => {
  it('should have prop\'s functions return nothing (void)', () => {
    const onClickForKey = jest.spyOn(VirtualKeyboard.defaultProps, 'onClickForKey')
    const onMouseOverForKey = jest.spyOn(VirtualKeyboard.defaultProps, 'onMouseOverForKey')
    const onMouseOutForKey = jest.spyOn(VirtualKeyboard.defaultProps, 'onMouseOutForKey')
    const consoleFunc = jest.spyOn(console, 'log')

    onClickForKey('J')
    onMouseOverForKey('R')
    onMouseOutForKey('M')

    expect(consoleFunc).toBeCalledTimes(3)
  })
})