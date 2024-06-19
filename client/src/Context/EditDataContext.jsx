import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const EditContext = createContext();

const EditProvider = ({ children }) => {
  const [data, setData] = useState();
  const [layerStyles, setLayerStyles] = useState({});

  useEffect(() => {
    const getData = async (bbox) => {
      const { lat_min, lat_max, lon_min, lon_max } = bbox;
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/Factories/", {
            params: {
              in_bbox: `${lon_min},${lat_min},${lon_max},${lat_max}`
          }
          }
        );
      setData(response.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
  }   
    };
    const bbox = {
      lat_min: 0.12,
      lat_max: 0.2,
      lon_min: 34.89,
      lon_max: 34.96
  };
//     const updateBounds = () => {
//       const map = mapRef.current;
//       if (map) {
//           const bounds = map.getBounds();
//           const bbox = {
//               lat_min: bounds.getSouth(),
//               lat_max: bounds.getNorth(),
//               lon_min: bounds.getWest(),
//               lon_max: bounds.getEast()
//           };
//           getData(bbox);
//       }
//   };
//   const MapEvents = () => {
//     useMapEvents({
//         moveend: updateBounds,
//         zoomend: updateBounds
//     });
//     return null;
// };
     getData(bbox);
  }, []);

  const updateLayerStyles = (layerIds, style) => {
    const newStyles = { ...layerStyles };
    layerIds.forEach(layerId => {
        newStyles[layerId] = style;
    });
    setLayerStyles(newStyles);
};

    return (
        <EditContext.Provider value={{ data, layerStyles, updateLayerStyles }}>
            {children}
        </EditContext.Provider>
    );
};

export { EditProvider, EditContext };
