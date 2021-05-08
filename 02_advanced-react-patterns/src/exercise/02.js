// Compound Components
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {Switch} from '../switch'

function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  return React.Children.map(children, child => {
    //if (typeof child.type !== 'function') return child
    if (!allowedTypes.includes(child.type)) return child

    const props = {
      on,
    }

    if (child.props.role === 'toggle-button') props.toggle = toggle

    return React.cloneElement(child, props)
  })
}

const ToggleOn = ({on, children}) => (on ? children : null)

const ToggleOff = ({on, children}) => (!on ? children : null)

const ToggleButton = ({on, toggle}) => <Switch on={on} onClick={toggle} />

const allowedTypes = [ToggleOn, ToggleOff, ToggleButton]

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <ToggleButton role="toggle-button" id="toggle-button" />
        <span>test</span>
      </Toggle>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
