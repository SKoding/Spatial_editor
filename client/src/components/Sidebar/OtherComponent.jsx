import React, {
    useState,
    useContext,
    useEffect,
  } from "react";
import axios from "axios";
import {
    useMap,
    GeoJSON,
  } from "react-leaflet";
import { OtherApiContext } from "../../Context/OtherApiContext";

import { Spinner } from "react-bootstrap";

export const OtherComponent = () => {
    const map = useMap();
    const [kapTea, kapFeat] = useContext(OtherApiContext);
  
    function zoomToFeature(e) {
      map.fitBounds(e.target.getBounds());
    }


    function onEachFeature(feature, layer) {
      layer.on({
        click: zoomToFeature,
        // mouseover:highlightFeature,
        // mouseout: resetHighlight,
      });
      if (feature.properties && feature.properties.name) {
        layer.bindPopup(feature.properties.name);
      }
    }
 console.log(kapTea)
    if (kapTea) {
      return (
        <GeoJSON
          data={kapTea}
          onEachFeature={onEachFeature}
          style={() => {
            return {
              color: "blue",
              dashArray: "3",
              fillColor: "#f0f0f0",
              fillOpacity: 0.01,
              opacity: 1,
              weight: 2,
            };
          }}
        />
      );
    } else {
      return null;
    }
  };