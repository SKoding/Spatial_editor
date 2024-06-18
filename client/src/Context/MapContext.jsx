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

// import { createContext, useState } from "react";

// const MapContext = createContext("");

// function MapProvider({ children }) {
//   const [markerLocation, setMarkerLocation] = useState("");
//   const values = {
//     markerLocation,
//     setMarkerLocation,
//   };

//   return <MapContext.Provider value={values}>{children}</MapContext.Provider>;
// }

// export { MapContext, MapProvider };

////<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< USECONTEXT <<<<<<<<<<<<<<<<<<<<<<<<
// const { createContext, useState } = require("react");

// const defaultProvider = {
//   isObjectiveDrawerOpen: false,
//   isKeyResultDrawerOpen: false,
//   newObjectiveTitle: "",
//   toggleObjectiveDrawer: () => {},
//   toggleKeyResultDrawer: () => {},
//   addNewObjectiveTitle: () => {},
// };

// const OkrContext = createContext(defaultProvider);

// function OkrProvider({ children }) {
//   const [isObjectiveDrawerOpen, setIsObjectiveDrawerOpen] = useState(defaultProvider.isObjectiveDrawerOpen);
//   const [isKeyResultDrawerOpen, setIsKeyResultDrawerOpen] = useState(defaultProvider.isKeyResultDrawerOpen);
//   const [newObjectiveTitle, setNewObjectiveTitle] = useState(defaultProvider.newObjectiveTitle);

//   const handleToggleObjective = () => setIsObjectiveDrawerOpen(!isObjectiveDrawerOpen);
//   const handleToggleKeyResult = () => setIsKeyResultDrawerOpen(!isKeyResultDrawerOpen);
//   const addNewObjectiveTitle = () => setNewObjectiveTitle(!isKeyResultDrawerOpen);

//   const values = {
//     isObjectiveDrawerOpen,
//     isKeyResultDrawerOpen,
//     newObjectiveTitle,
//     toggleObjectiveDrawer: handleToggleObjective,
//     toggleKeyResultDrawer: handleToggleKeyResult,
//     addNewObjectiveTitle,
//   };

//   return <OkrContext.Provider value={values}>{children}</OkrContext.Provider>;
// }

// export { OkrContext, OkrProvider };
