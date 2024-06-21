// MapContext.js
import React, { createContext, useContext, useRef } from 'react';

const MapRefContext = createContext();

export const useMapRef = () => useContext(MapRefContext);

export const MapRefProvider = ({ children }) => {
  const mapRef = useRef();
  return (
    <MapRefContext.Provider value={mapRef}>
      {children}
    </MapRefContext.Provider>
  );
};
