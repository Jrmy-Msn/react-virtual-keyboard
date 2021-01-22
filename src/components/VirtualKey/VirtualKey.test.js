import React from 'react'
import renderer from 'react-test-renderer'
import {shallow} from 'enzyme'

import VirtualKey from "../VirtualKey/VirtualKey"


describe('VirtualKey Component Render', () => {
  it('should render <VirtualKey />', () => {
    let wrapper = shallow(<VirtualKey value="J"/>)
    expect(wrapper).not.toBeNull()
  })

  it('should display "value" prop', () => {
    let wrapper = shallow(<VirtualKey value="J"/>)
    expect(wrapper.text()).toEqual('J')

    const child = (<span>Toto</span>)
    wrapper = shallow(<VirtualKey value={child}/>)
    expect(wrapper.text()).toEqual('Toto')
  })

  it('should add the "feedback" prop CSS class', () => {
    const wrapper = shallow(<VirtualKey active={true} value="E"/>)
    expect(wrapper.hasClass(/-active/)).toBe(true)
  })

  it('should call "onClick" prop, after click, with "value" prop as argument', () => {
    const onClick = jest.fn()
    const wrapper = shallow(<VirtualKey value="M" onClick={onClick}/>)
    wrapper.simulate('click')
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onClick).toHaveBeenCalledWith("M")
  })

  it('should call "onMouseOver" prop, when mouse over, with "value" prop as argument', () => {
    const onMouseOver = jest.fn()
    const wrapper = shallow(<VirtualKey value="M" onMouseOver={onMouseOver}/>)
    wrapper.simulate('mouseover')
    expect(onMouseOver).toHaveBeenCalledTimes(1)
    expect(onMouseOver).toHaveBeenCalledWith("M")
  })

  it('should call "onMouseOut" prop, when mouse over, with "value" prop as argument', () => {
    const onMouseOut = jest.fn()
    const wrapper = shallow(<VirtualKey value="M" onMouseOut={onMouseOut}/>)
    wrapper.simulate('mouseOut')
    expect(onMouseOut).toHaveBeenCalledTimes(1)
    expect(onMouseOut).toHaveBeenCalledWith("M")
  })

  it('renders correctly', () => {
    const tree = renderer
      .create(<VirtualKey value="M"/>)
      .toJSON();
    expect(tree).toMatchSnapshot()
  })
})

describe('VirtualKey Default prop', () => {
  it('should have prop\'s functions return nothing (void)', () => {
    const onClick = jest.spyOn(VirtualKey.defaultProps, 'onClick')
    const onMouseOut = jest.spyOn(VirtualKey.defaultProps, 'onMouseOut')
    const onMouseOver = jest.spyOn(VirtualKey.defaultProps, 'onMouseOver')

    onClick()
    onMouseOut()
    onMouseOver()

    expect(onClick).toHaveReturnedWith(void undefined)
    expect(onMouseOut).toHaveReturnedWith(void undefined)
    expect(onMouseOver).toHaveReturnedWith(void undefined)
  })
})

