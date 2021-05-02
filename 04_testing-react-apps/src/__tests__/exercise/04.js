// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
import {build, fake} from '@jackfranklin/test-data-bot'

import Login from '../../components/login'

function buildLoginForm({usernameArg, passwordArg} = {}) {
  const username = usernameArg || faker.internet.userName()
  const password = passwordArg || faker.internet.password()

  return {username, password}
}

const buildLoginForm2 = build({
  fields: {
    username: fake(faker => faker.internet.userName()),
    password: fake(faker => faker.internet.password()),
  },
})

test('submitting the form calls onSubmit with username and password', () => {
  // 🐨 create a variable called "submittedData" and a handleSubmit function that
  // accepts the data and assigns submittedData to the data that was submitted
  // 💰 if you need a hand, here's what the handleSubmit function should do:
  // let submittedData = null
  const {username, password} = buildLoginForm()

  //const handleSubmit = data => (submittedData = data)
  const handleSubmit = jest.fn()

  // 🐨 render the login with your handleSubmit function as the onSubmit prop
  render(<Login onSubmit={handleSubmit} />)

  //screen.debug()

  // 🐨 get the username and password fields via `getByLabelText`
  const usernameInputField = screen.getByLabelText(/username/i)
  const passwordInputField = screen.getByLabelText(/password/i)

  // 🐨 use userEvent.type to change the username and password fields to
  userEvent.type(usernameInputField, username)
  userEvent.type(passwordInputField, password)

  // 🐨 click on the button with the text "Submit"
  const submitButton = screen.getByRole('button', {name: /submit/i})
  userEvent.click(submitButton)

  // assert that submittedData is correct
  // 💰 use `toEqual` from Jest: 📜 https://jestjs.io/docs/en/expect#toequalvalue
  /* 
  expect(submittedData).toEqual({
    username,
    password,
  })
  */

  expect(handleSubmit).toHaveBeenCalledWith({username, password})
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})

/*
eslint
  no-unused-vars: "off",
*/
