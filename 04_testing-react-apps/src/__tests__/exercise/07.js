// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import {ThemeProvider} from '../../components/theme'
import EasyButton from '../../components/easy-button'

function renderWithTheme(
  {theme = 'light', ...options} = {},
  ui = <EasyButton>Easy</EasyButton>,
) {
  const Wrapper = ({children}) => (
    <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
  )

  return render(ui, {wrapper: Wrapper, ...options})
}

test('renders with the light styles for the light theme', () => {
  /*
  render(
    <ThemeProvider>
      <EasyButton>Easy</EasyButton>
    </ThemeProvider>,
  )
  */

  const Wrapper = ({children}) => <ThemeProvider>{children}</ThemeProvider>

  render(<EasyButton>Easy</EasyButton>, {wrapper: Wrapper})

  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
     background-color: white;
     color: black;
   `)
})

test('renders with the dark styles for the dark theme', () => {
  renderWithTheme({theme: 'dark'})

  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
     background-color:black;
     color:white;
   `)
})

/*
### 3. 💯 swap @testing-library/react with app test utils

We've actually already created a custom render method for this! So swap your
`import` of `@testing-library/react` with `test/test-utils` which you can find
in `./src/test/test-utils.js`.
*/

/* eslint no-unused-vars:0 */
