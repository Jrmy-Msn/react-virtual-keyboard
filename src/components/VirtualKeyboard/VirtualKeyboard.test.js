import React from 'react'
import renderer from 'react-test-renderer'
import {createShallow} from "@material-ui/core/test-utils"

import VirtualKeyboard from "./VirtualKeyboard"
import VirtualKey from "../VirtualKey/VirtualKey"

describe('VirtualKeyboard Component Render', () => {
  let shallow

  beforeAll(() => {
    shallow = createShallow({dive: true});
  })

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

  it('should call "onKeyUp" prop after finish active a physical key', () => {
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

  it('should call "isKeyActive" prop for each <VirtualKey /> component', () => {
    const isKeyActive = jest.fn()
    isKeyActive.mockImplementation(() => 'active')
    const wrapper = shallow(<VirtualKeyboard isKeyActive={isKeyActive}/>)
    const aKeys = wrapper.find('VirtualKey')
    expect(isKeyActive).toHaveBeenCalledTimes(aKeys.length)
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