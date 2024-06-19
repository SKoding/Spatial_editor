import React, {
  useMemo,
  useState,
  useCallback,
  useContext,
  useEffect,
  useRef
} from "react";
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
import { useMapEvent } from "react-leaflet/hooks";
import { useEventHandlers } from "@react-leaflet/core";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import { Icon } from "leaflet";
import axios from "axios";
import { Alert, Spinner } from "react-bootstrap";
import { MapContext } from "../../Context/MapContext";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { EditContext } from "../../Context/EditDataContext";
import { useReactToPrint } from "react-to-print";


// Classes used by Leaflet to position controls
const POSITION_CLASSES = {
  bottomleft: "leaflet-bottom leaflet-left",
  bottomright: "leaflet-bottom leaflet-right",
  topleft: "leaflet-top leaflet-left",
  topright: "leaflet-top leaflet-right",
};

const BOUNDS_STYLE = { weight: 1 };

function MinimapBounds({ parentMap, zoom }) {
  const minimap = useMap();

  // Clicking a point on the minimap sets the parent's map center
  const onClick = useCallback(
    (e) => {
      parentMap.setView(e.latlng, parentMap.getZoom());
    },
    [parentMap]
  );
  useMapEvent("click", onClick);

  // Keep track of bounds in state to trigger renders
  const [bounds, setBounds] = useState(parentMap.getBounds());
  const onChange = useCallback(() => {
    setBounds(parentMap.getBounds());
    // Update the minimap's view to match the parent map's center and zoom
    minimap.setView(parentMap.getCenter(), zoom);
  }, [minimap, parentMap, zoom]);

  // Listen to events on the parent map
  const handlers = useMemo(() => ({ move: onChange, zoom: onChange }), []);
  useEventHandlers({ instance: parentMap }, handlers);

  return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />;
}

function MinimapControl({ position, zoom }) {
  const parentMap = useMap();
  const mapZoom = zoom || 8;

  // Memoize the minimap so it's not affected by position changes
  const minimap = useMemo(
    () => (
      <MapContainer
        style={{ height: 80, width: 100 }}
        center={parentMap.getCenter()}
        zoom={mapZoom}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        attributionControl={false}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
      </MapContainer>
    ),
    []
  );

  const positionClass =
    (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;
  return (
    <div className={positionClass}>
      <div className="leaflet-control leaflet-bar">{minimap}</div>
    </div>
  );
}

//MOUSE EVENTS
const LocationFinderDummy = () => {
  const [markerLocation, setMarkerLocation] = useContext(MapContext);
  const [loc, setLoc] = useState(null);
  const map = useMapEvents({
    click(e) {
      setLoc(e.latlng);
      setMarkerLocation(e.latlng);
      // setMarkerLocation(e.latlng);
      //console.log(markerLocation);
    },
  });
  return loc === null ? null : (
    <Marker position={loc}>
      <Popup>
        <div className="h-10 text-center border-2 border-black flex flex-col">
          <h4 className="text-lime-950">Latitude: {loc.lat}</h4>
          <h4 className="text-lime-950">Longitude: {loc.lng}</h4>
        </div>
      </Popup>
    </Marker>
  );
};

function Map() {
  const MyData = () => {
    const {data, layerStyles} = useContext(EditContext);
    const map = useMap();
    if (!data) {
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

    function onEachFeatureMap(feature, layer) {
      layer.on({
        click: zoomToFeature,
        // mouseover:highlightFeature,
        // mouseout: resetHighlight,
      });
      if (feature.properties && feature.properties.name_4) {
        layer.bindPopup(feature.properties.name_4);
      }
    }
    const getStyle = (feature) => {
      const layerId = feature.id;
      return layerStyles[layerId] || {
          color: 'blue',
          weight: 2,
          fillOpacity: 0.05
      };
  };

    if (data) {
      return (
        <GeoJSON
          data={data}
          onEachFeature={onEachFeatureMap}
          style={getStyle}
          // style={() => {
          //   return {
          //     color: "blue",
          //     dashArray: "2",
          //     fillColor: "#f0f0f0",
          //     fillOpacity: 0.01,
          //     opacity: 1,
          //     weight: 2,
          //   };
          // }}
        />
      );
    } else {
      return null;
    }
  };
  // Map Printing
  const mapRef = useRef();
  const handlePrintToPDF = async () => {
    const element = mapRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [element.clientWidth, element.clientHeight]
    });
    pdf.addImage(imgData, 'PNG', 0, 0, element.clientWidth, element.clientHeight);
    pdf.save("map.pdf");
};
  return (
    <div>
      <div className="h-full" ref={mapRef}>
        <MapContainer center={[0.116, 35.189]} zoom={14} scrollWheelZoom={true} whenCreated={mapInstance => { mapRef.current = mapInstance }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* <SelectData />
        <NurseryLocation /> */}
          <LayersControl position="topright">
            <LayersControl.Overlay name="Esri Imagery">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png"
              />
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Farms">
              <MyData />
            </LayersControl.Overlay>
          </LayersControl>
          <MinimapControl position="bottomleft" />
          <LocationFinderDummy />
        </MapContainer>
      </div>
      <button onClick={handlePrintToPDF}>Print Map</button>
    </div>
  );
}

export default Map;
