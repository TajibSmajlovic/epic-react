// Code splitting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
//import Globe from '../globe'

// const loadGlobe1 = () => import('../globe')
const loadGlobe2 = () => import(/* webpackPrefetch: true */ '../globe')
const Globe = React.lazy(loadGlobe2)
// 🐨 use React.lazy to create a Globe component which uses a dynamic import
// to get the Globe component from the '../globe' module.

function App() {
  const [showGlobe, setShowGlobe] = React.useState(false)

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%',
          padding: '2rem',
        }}
      >
        <label
          style={{marginBottom: '1rem'}}
          // onFocus={loadGlobe1}
          // onMouseEnter={loadGlobe1}
        >
          <input
            type="checkbox"
            checked={showGlobe}
            onChange={e => setShowGlobe(e.target.checked)}
          />
          {' show globe'}
        </label>
        <div style={{width: 400, height: 400}}>
          {showGlobe ? <Globe /> : null}
        </div>
      </div>
    </React.Suspense>
  )
}
// 🦉 Note that if you're not on the isolated page, then you'll notice that this
// app actually already has a React.Suspense component higher up in the tree
// where this component is rendered, so you *could* just rely on that one.

export default App
