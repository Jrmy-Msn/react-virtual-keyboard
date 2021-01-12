import React from 'react'
import {cleanup, fireEvent, render, screen} from '@testing-library/react'

import VirtualKeyboard from "./VirtualKeyboard"

afterEach(cleanup)

it('should display 26 <VirtualKey /> component', () => {
  render(<VirtualKeyboard />)
  const aKeys = screen.getAllByRole('button', {name: /Lettre [A-Z]/})
  expect(aKeys).toHaveLength(26)
})

it('should display X <VirtualKey /> component based on number of letter in "layout prop', () => {
  render(<VirtualKeyboard layout={['JRMY', 'MSN']} />)
  const aKeys = screen.getAllByRole('button', {name: /Lettre [A-Z]/})
  expect(aKeys).toHaveLength(7)
})

it('should <VirtualKey /> component with "currentKey" prop as "value" prop have a "feedback" prop', () => {
  const feedbackForCurrentKey = jest.fn()
  feedbackForCurrentKey.mockImplementation((p) => p === 'J' ? 'pressed' : '')
  render(<VirtualKeyboard currentKey={'J'} feedbackForCurrentKey={feedbackForCurrentKey} />)
  expect(screen.getByText('J')).toHaveClass('pressed')
})

it('should call "onKeyDown" prop after start pressed a physical key', () => {
  const onKeyDown = jest.fn()
  render(<VirtualKeyboard onKeyDown={onKeyDown}/>)
  fireEvent.keyDown(screen.getByLabelText('Clavier virtuel'))
  expect(onKeyDown).toHaveBeenCalledTimes(1)
})

it('should call "onKeyUp" prop after finish pressed a physical key', () => {
  const onKeyUp = jest.fn()
  render(<VirtualKeyboard onKeyUp={onKeyUp}/>)

  fireEvent.keyUp(screen.getByLabelText('Clavier virtuel'))
  expect(onKeyUp).toHaveBeenCalledTimes(1)
})

it('should call "feedbackForCurrentKey" prop for each <VirtualKey /> component', () => {
  const feedbackForCurrentKey = jest.fn()
  feedbackForCurrentKey.mockImplementation(() => 'pressed')
  render(<VirtualKeyboard feedbackForCurrentKey={feedbackForCurrentKey}/>)
  const aKeys = screen.getAllByRole('button', {name: /Lettre [A-Z]/})
  expect(feedbackForCurrentKey).toHaveBeenCalledTimes(aKeys.length)
})

