// mocking HTTP requests
// http://localhost:3000/login-submission

import * as React from 'react'
// 🐨 you'll need to grab waitForElementToBeRemoved from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import {build, fake} from '@jackfranklin/test-data-bot'
// 🐨 you'll need to import rest from 'msw' and setupServer from msw/node
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {handlers} from 'test/server-handlers'
import Login from '../../components/login-submission'

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

// 🐨 get the server setup with an async function to handle the login POST request:
// 💰 here's something to get you started
// you'll want to respond with an JSON object that has the username.
// 📜 https://mswjs.io/
/*
const server = setupServer(
  rest.post(
    'https://auth-provider.example.com/api/login',
    async (req, res, ctx) => {
      return res(
        ctx.json({
          username: req.body.username,
        }),
      )
    },
  ),
)
*/

const server = setupServer(...handlers)

// 🐨 before all the tests, start the server with `server.listen()`
beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

// 🐨 after all the tests, stop the server with `server.close()`
afterAll(() => server.close())

test(`logging in displays the user's username`, async () => {
  render(<Login />)

  const {username, password} = buildLoginForm()

  userEvent.type(screen.getByLabelText(/username/i), username)
  userEvent.type(screen.getByLabelText(/password/i), password)

  // 🐨 uncomment this and you'll start making the request!
  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  // as soon as the user hits submit, we render a spinner to the screen. That
  // spinner has an aria-label of 'loading' for accessibility purposes, so
  // 🐨 wait for the loading spinner to be removed using waitForElementToBeRemoved
  // 📜 https://testing-library.com/docs/dom-testing-library/api-async#waitforelementtoberemoved
  await waitForElementToBeRemoved(() => screen.queryByLabelText('loading...'))

  // once the login is successful, then the loading spinner disappears and
  // we render the username.
  // 🐨 assert that the username is on the screen
  expect(screen.getByText(username)).toBeInTheDocument()
})

test('should throw an error: "password required" ', async () => {
  render(<Login />)

  // 🐨 uncomment this and you'll start making the request!
  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  await waitForElementToBeRemoved(() => screen.queryByLabelText('loading...'))

  // expect(screen.getByRole('alert')).toHaveTextContent(/password required/i)
  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"password required"`,
  )
})

test('Unknown server error displays the error message', async () => {
  const errorMessage = 'Something went wrong!'

  server.use(
    rest.post(
      // note that it's the same URL as our app-wide handler
      // so this will override the other.
      'https://auth-provider.example.com/api/login',
      async (req, res, ctx) => {
        // your one-off handler here
        return res(ctx.status(500), ctx.json({message: errorMessage}))
      },
    ),
  )

  render(<Login />)

  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  await waitForElementToBeRemoved(() => screen.queryByLabelText('loading...'))

  /*
  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"Something went wrong"`,
  )
  */

  expect(screen.getByRole('alert')).toHaveTextContent(errorMessage)
})
