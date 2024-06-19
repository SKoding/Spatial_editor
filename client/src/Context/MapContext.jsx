import { createContext, useState } from "react";

//create a context, with createContext api
const MapContext = createContext();

const MapProvider = (props) => {
  // this state will be shared with all components
  const [markerLocation, setMarkerLocation] = useState("");

  return (
    // this is the provider providing state
    <MapContext.Provider value={[markerLocation, setMarkerLocation]}>
      {props.children}
    </MapContext.Provider>
  );
};

export { MapProvider, MapContext };