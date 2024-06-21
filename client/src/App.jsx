import React from 'react'
import Landing from './components/Landing'
import './App.css'
import { MapProvider } from './Context/MapContext'
import { EditProvider } from './Context/EditDataContext'
import { MapRefProvider } from './Context/MapRefContext'

function App() {
  return (
    <MapRefProvider>
      <EditProvider>
        <MapProvider >
          <Landing />
        </MapProvider>
      </EditProvider>
    </MapRefProvider>
  )
}

export default App
