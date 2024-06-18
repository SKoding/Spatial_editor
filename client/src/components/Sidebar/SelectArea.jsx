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
import { MapContext } from "../../Context/MapContext";
import React, {
    useMemo,
    useState,
    useCallback,
    useContext,
    useEffect,
  } from "react";
import { Alert, Spinner } from "react-bootstrap";

export const SelectData = () => {
    const map = useMap();
    const [markerLocation, setMarkerLocation] = useContext(MapContext)
    const [adminSelect, setAdminSelect] = useState();
    useEffect(() => {
      const areaSelect = async () => {
        const area = await axios.get(
          "http://localhost:8000/api/v1/distance/get_Location/", {
            params: {
              lat:markerLocation.lat,
              lng:markerLocation.lng
            }
          }
        );
        setAdminSelect(area.data);
        //setAreaName(result.data);
      };
      areaSelect();
    }, [markerLocation]);

    // console.log(adminSelect)
  
    if (!adminSelect) {
      return (
        <Spinner
          animation="border"
          variant="danger"
          role="status"
          style={{
            width: "400px",
            height: "400px",
            margin: "auto",
            display: "block",
          }}
        />
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
      if (feature.properties && feature.properties.name_4) {
        layer.bindPopup(feature.properties.name_4);
      }
    }

    if (adminSelect) {
      return (
        <GeoJSON
          data={adminSelect}
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