import React from 'react'
import Landing from './components/Landing'
import './App.css'
import { MapProvider } from './Context/MapContext'
import { EditProvider } from './Context/EditDataContext'

function App() { 
  return (
    <EditProvider>
      <MapProvider >
        <Landing />
      </MapProvider>
    </EditProvider>
  )
}

export default App
