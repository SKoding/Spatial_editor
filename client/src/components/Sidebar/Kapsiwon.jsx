import axios from "axios";
import {
    MapContainer,
    TileLayer,
    LayersControl,
    useMap,
    Rectangle,
    Marker,
    Popup,
    useMapEvents,
    GeoJSON,
  } from "react-leaflet";
import { MapContext } from "../../Context/MapContext.jsx";
import React, {
    useMemo,
    useState,
    useCallback,
    useContext,
    useEffect,
  } from "react";
import { Alert, Spinner } from "react-bootstrap";
import {confirmedStyle} from "./Kapsiwon_Style.jsx"


export const LossesLocation = () => {
    const map = useMap();
    const [markerLocation, setMarkerLocation] = useContext(MapContext)
    const [losSelect, setLosSelect] = useState();
    const [data, setTheData] = useState();

    useEffect(() => {
      const losSelect = async () => {
        const loss = await axios.get(
          "http://localhost:8000/api/v1/Kapsiwon%20Bluegum/", {
            params: {
              lat:markerLocation.lat,
              lng:markerLocation.lng
            }
          }
        );
        setLosSelect(loss.data);
        const theData=loss.data;
        setTheData(theData.features[0])
        //setAreaName(result.data);
      };
      losSelect();
    }, [markerLocation]);
    console.log(losSelect);
  
    if (!losSelect) {
      return (
        <div>loading</div>
      );
    }
    function zoomToFeature(e) {
      map.fitBounds(e.target.getBounds());
    }


    function onEachFeature(feature, layer) {
      layer.on({
        click: zoomToFeature,
        // mouseover:highlightFeature,
        // mouseout: resetHighlight,
      });
      if (feature.properties && feature.properties.loss_year) {
        layer.bindPopup(feature.properties.loss_year);
      }
    }
    
    // const getFeatureStyle = (feature) => {
    //   const color = feature.properties.loss_year;
    //   let fillColor;

    //   if (loss_year >=0){
    //     fillColor='blue'
    //   }
    //   // Define the style properties based on the feature's properties
    //   return {
    //     fillColor: fillColor,
    //     color: 'black',
    //     weight: 1,
    //     opacity: 1,
    //     fillOpacity: 0.7,
    //   };
    // };
    const getFeatureStyle = (feature) => {
      const lossYear = feature.properties.loss_year;
  
      // Assign different styles based on the loss_year value
      let fillColor;
      if (lossYear >= 20) {
        fillColor = 'green';
      }
      else if (lossYear <= 20) {
        fillColor = '#00000000'
      }
      else {
        fillColor = 'blue';
      }
  
      // Define the style properties based on the loss_year value
      return {
        fillColor,
        color: 'black',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.7,
      };
    };
    if (losSelect) {
      return (
        <GeoJSON
        key={data}
          // key={losSelect.features.id}
          data={losSelect}
          onEachFeature={onEachFeature}
          style={
            getFeatureStyle
          //   () => {
          //   return {
          //     fillColor: "green",
          //     dashArray: "3",
          //     //fillColor: "#f0f0f0",
          //     fillOpacity: 0.81,
          //     opacity: 1,
          //     weight: 2,
          //   };
          // }
          // confirmedStyle
          }
        />
      );
    } else {
      return null;
    }
  };
