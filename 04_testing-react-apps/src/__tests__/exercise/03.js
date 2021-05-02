//
// http://localhost:3000/counter

import * as React from 'react'
import {screen, render} from '@testing-library/react'
import Counter from '../../components/counter'
import userEvent from '@testing-library/user-event'

test('counter increments and decrements when the buttons are clicked', () => {
  render(<Counter />)
  // 🐨 replace these with screen queries
  // 💰 you can use `getByText` for each of these (`getByRole` can work for the button too)
  const incrementButton = screen.getByRole('button', {name: /increment/i})
  const decrementButton = screen.getByRole('button', {name: /decrement/i})
  const message = screen.getByText(/current count/i, {exact: false})

  expect(message).toHaveTextContent('Current count: 0')
  userEvent.click(incrementButton)
  expect(message).toHaveTextContent('Current count: 1')
  userEvent.click(decrementButton)
  expect(message).toHaveTextContent('Current count: 0')
})
