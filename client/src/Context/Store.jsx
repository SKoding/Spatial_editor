import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import { ApiContext } from '../Context/ApiContext'
import axios from 'axios'

// function Store({ children }) {
//   const [users, setUsers] = useState([])
//   useEffect(() => {
//     axios
//       .get('http://localhost:8000/api/administrative/')
//       .then((res) => {
//         setUsers(res.data)
//         console.log(res.data)
//       })
//       .catch((error) => {
//         console.log(error)
//       })
//   }, [])
//   return (
//     <ApiContext.Provider value={[users, setUsers]}>
//       {children}
//     </ApiContext.Provider>
//   )
// }
// export default Store
const MyData = () => {
    const [data, setData] = useState();
    const map = useMap();
  
    useEffect(() => {
      const getData = async () => {
        const response = await axios.get(
          "http://localhost:8000/api/administrative/"
        );
        setData(response.data);
      };
      getData();
    }, []);
  
    if (data) {
      // These next 3 lines purely for debuggins:
      const geojsonObject = L.geoJSON(data);
      map.fitBounds(geojsonObject.getBounds());
      console.log(geojsonObject);
      // end debugging
  
      return <GeoJSON data={data} />;
    } else {
      return null;
    }
  };