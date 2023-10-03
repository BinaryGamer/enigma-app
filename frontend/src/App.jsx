import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Rotors from './components/Rotors'

function App() {

  return (
    <>
    <Rotors order={["II", "III", "I"]} reflector="B" />
    </>
  )
}

export default App
