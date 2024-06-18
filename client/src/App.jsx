import React from 'react'
import Landing from './components/Landing'
import './App.css'
import { MapProvider } from './Context/MapContext'

function App() { 
  return (
    <MapProvider >
      <Landing />
    </MapProvider>
  )
}

export default App
