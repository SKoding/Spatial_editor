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

// const fetcher = (url) => axios.get(url).then((res) => res.data);

function Map() {
  //   const [activeAdmin, setActiveAdmin] = useState(null);
  //   const { data, error } = useSWR("http://localhost:8000/api/administrative/", fetcher);
  //   const admins = data && !error ? data : {};

  //   console.log(admins)
  //   if (error) {
  //     return <Alert variant="danger">There is a problem</Alert>;
  //  }
  const MyData = () => {
    const [data, setData] = useState();
    const map = useMap();

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

    if (data) {
      // These next 3 lines purely for debuggins:
      //const geojsonObject = L.geoJSON(data);
      // map.fitBounds(geojsonObject.getBounds());
      //console.log(geojsonObject);
      // end debugging

      return (
        <GeoJSON
          data={data}
          onEachFeature={onEachFeatureMap}
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
            <LayersControl.Overlay name="Farms">
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
