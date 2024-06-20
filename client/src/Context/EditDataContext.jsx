import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';

const EditContext = createContext();

const EditProvider = ({ children }) => {
  const [data, setData] = useState();
  const [kapData, setkapData] = useState();
  const [taiData, settaiData] = useState();
  const [taiFeatData, setTaiFeatData] = useState();
  const [mokData, setmokData] = useState();
  const [mokFeatData, setMokFeatData] = useState();
  const [featureStyles, setFeatureStyles] = useState({});
  const [selectedDivision, setSelectedDivision] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/KapFeat/').then(response => setkapData(response.data)).catch(error => console.error(error))
    axios.get('http://localhost:8000/api/v1/taiTea/').then(response => settaiData(response.data)).catch(error => console.error(error))
    axios.get('http://localhost:8000/api/v1/taiFeat/').then(response => setTaiFeatData(response.data)).catch(error => console.error(error))
    axios.get('http://localhost:8000/api/v1/mokTea/').then(response => setmokData(response.data)).catch(error => console.error(error))
    axios.get('http://localhost:8000/api/v1/mokFeat/').then(response => setMokFeatData(response.data)).catch(error => console.error(error))

    const getData = async (bbox) => {
      const { lat_min, lat_max, lon_min, lon_max } = bbox;
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/KapTea/", {
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


  //   const updateGroupStyle = (featureType, style) => {
  //     const newStyles = { ...layerStyles };
  //     data.features.forEach(feature => {
  //         if (feature.properties.feature === featureType) {
  //             newStyles[feature.id] = style;
  //         }
  //     });
  //     setLayerStyles(newStyles);
  // };
  useEffect(() => {
    const savedStyles = JSON.parse(sessionStorage.getItem('featureStyles'));
    if (savedStyles) {
      setFeatureStyles(savedStyles);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('featureStyles', JSON.stringify(featureStyles));
  }, [featureStyles]);

  const updateFeatureStyle = useCallback((featureId, style) => {
    setFeatureStyles(prevStyles => ({
      ...prevStyles,
      [featureId]: style
    }));
  }, []);

  const contextValue = useMemo(() => ({
    data,
    featureStyles,
    updateFeatureStyle
  }), [data, featureStyles, updateFeatureStyle]);

  return (
    <EditContext.Provider value={{ data,kapData, taiData, taiFeatData, mokData, mokFeatData,featureStyles, contextValue }}>
      {children}
    </EditContext.Provider>
  );
};

export { EditProvider, EditContext };
