import React from 'react'
import {cleanup, fireEvent, render, screen} from '@testing-library/react'

import VirtualKey from "../VirtualKey/VirtualKey"

afterEach(cleanup)

it('should display "value" prop', () => {
  render(<VirtualKey value="J"/>)
  expect(screen.getByRole('button')).not.toBeNull()
})

it('should add the "feedback" prop CSS class', () => {
  let {container} = render(<VirtualKey feedback="pressed" value="E"/>)
  expect(screen.getByRole('button')).toHaveClass('pressed')
})

it('should call "onClick" prop after click with "value" prop as argument', () => {
  const onClick = jest.fn()
  render(<VirtualKey value="M" onClick={onClick}/>)
  fireEvent.click(screen.getByRole('button'))
  expect(onClick).toHaveBeenCalledTimes(1)
  expect(onClick).toHaveBeenCalledWith("M")
})

