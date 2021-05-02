// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import ReactDOM from 'react-dom'
import Counter from '../../components/counter'

beforeEach(() => {
  document.body.innerHTML = ''
})

test('counter increments and decrements when the buttons are clicked', () => {
  // 🐨 create a div to render your component to (💰 document.createElement)
  const div = document.createElement('div')

  // 🐨 append the div to document.body (💰 document.body.append)
  document.body.append(div)

  // 🐨 use ReactDOM.render to render the <Counter /> to the div
  ReactDOM.render(<Counter />, div)

  // 🐨 get a reference to the increment and decrement buttons:
  const [decrement, increment] = div.querySelectorAll('button')
  // 🐨 get a reference to the message div:
  const message = div.firstChild.querySelector('div')

  // 🐨 expect the message.textContent toBe 'Current count: 0'
  expect(message.textContent).toBe('Current count: 0')

  // 🐨 click the increment button (💰 increment.click())
  // increment.click()
  const incrementClickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0,
  })

  increment.dispatchEvent(incrementClickEvent)

  // 🐨 assert the message.textContent
  expect(message.textContent).toBe('Current count: 1')

  // 🐨 click the decrement button (💰 decrement.click())
  //  decrement.click()

  const decrementClickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0,
  })

  decrement.dispatchEvent(decrementClickEvent)

  // 🐨 assert the message.textContent
  expect(message.textContent).toBe('Current count: 0')

  // 🐨 cleanup by removing the div from the page (💰 div.remove())
  // 🦉 If you don't cleanup, then it could impact other tests and/or cause a memory leak
  div.remove()
})

/* eslint no-unused-vars:0 */
