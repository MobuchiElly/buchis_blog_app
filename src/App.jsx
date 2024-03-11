import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Getposts from './components/Getposts'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Getposts />
    </>
  )
}

export default App;