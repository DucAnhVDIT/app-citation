import { useState } from 'react'

import './App.css'
import { Button } from './components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Citation Generator</h1>
      <Button>Generate Citation</Button>
    </>
  )
}

export default App
