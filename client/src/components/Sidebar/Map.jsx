import React, {
  useMemo,
  useState,
  useCallback,
  useContext,
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
import { MapContext } from "../../Context/MapContext";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { EditContext } from "../../Context/EditDataContext";


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
  const {data, featureStyles, kapData, taiData, taiFeatData, mokData, mokFeatData} = useContext(EditContext);
  
  const MyData = () => {
    
    const map = useMap();

    function zoomToFeature(e) {
      map.fitBounds(e.target.getBounds());
    }

    function onEachFeatureMap(feature, layer) {
      layer.on({
        click: zoomToFeature,
        // mouseover:highlightFeature,
        // mouseout: resetHighlight,
      });
      if (feature.properties && feature.properties.feature) {
        layer.bindPopup("<strong>" + feature.properties.field_code +"</strong>" + "<br>" + feature.properties.feature + "<br>" + feature.properties.area +" <strong>Ha</strong>");
      }
    }
    const getStyle = (feature) => {
      const layerId = feature.id;
      return featureStyles[layerId] || {
          color: '#00b300',
          weight: 2,
          fillOpacity: 0.5
      };
  };


    if (data) {
      return (
        <GeoJSON
          data={data}
          onEachFeature={onEachFeatureMap}
          style={getStyle}
        />
      );
    } else {
      return null;
    }
  };

  const MyAdditionalData = () => {
    const map = useMap();

    const zoomToFeature = (e) => {
      map.fitBounds(e.target.getBounds());
    };

    const onEachFeatureMap = (feature, layer) => {
      layer.on({
        click: zoomToFeature,
      });
      if (feature.properties && feature.properties.name) {
        layer.bindPopup(
          "<strong>" + feature.properties.feature + "</strong>"
        );
      }
    };

    const getStyle = (feature) => {
      const layerId = feature.id;
      return featureStyles[layerId] || {
        color: '#741d1d',
        weight: 2,
        fillOpacity: 0.5
      };
    };

    return kapData ? (
      <GeoJSON
        data={kapData}
        onEachFeature={onEachFeatureMap}
        style={getStyle}
      />
    ) : null;
  };

  const TaiData = () => {
    const map = useMap();

    const zoomToFeature = (e) => {
      map.fitBounds(e.target.getBounds());
    };

    const onEachFeatureMap = (feature, layer) => {
      layer.on({
        click: zoomToFeature,
      });
      if (feature.properties && feature.properties.feature) {
        layer.bindPopup(
          "<strong>" + feature.properties.field_code + "</strong>" +
          "<br>" + feature.properties.feature + "<br>" + feature.properties.area + " <strong>Ha</strong>"
        );
      }
    };

    const getStyle = (feature) => {
      const layerId = feature.id;
      return featureStyles[layerId] || {
        color: '#008000',
        weight: 2,
        fillOpacity: 0.5
      };
    };

    return taiData ? (
      <GeoJSON
        data={taiData}
        onEachFeature={onEachFeatureMap}
        style={getStyle}
      />
    ) : null;
  };
  const TaiFeatData = () => {
    const map = useMap();

    const zoomToFeature = (e) => {
      map.fitBounds(e.target.getBounds());
    };

    const onEachFeatureMap = (feature, layer) => {
      layer.on({
        click: zoomToFeature,
      });
      if (feature.properties && feature.properties.name) {
        layer.bindPopup(
          "<strong>" + feature.properties.name + "</strong>"
        );
      }
    };

    const getStyle = (feature) => {
      const layerId = feature.id;
      return featureStyles[layerId] || {
        color: '#a52a2a',
        weight: 2,
        fillOpacity: 0.5
      };
    };

    return taiFeatData ? (
      <GeoJSON
        data={taiFeatData}
        onEachFeature={onEachFeatureMap}
        style={getStyle}
      />
    ) : null;
  };
  const MokData = () => {
    const map = useMap();

    const zoomToFeature = (e) => {
      map.fitBounds(e.target.getBounds());
    };

    const onEachFeatureMap = (feature, layer) => {
      layer.on({
        click: zoomToFeature,
      });
      if (feature.properties && feature.properties.feature) {
        layer.bindPopup(
          "<strong>" + feature.properties.field_code + "</strong>" +
          "<br>" + feature.properties.feature + "<br>" + feature.properties.area + " <strong>Ha</strong>"
        );
      }
    };

    const getStyle = (feature) => {
      const layerId = feature.id;
      return featureStyles[layerId] || {
        color: '#24ad26',
        weight: 2,
        fillOpacity: 0.5
      };
    };

    return mokData ? (
      <GeoJSON
        data={mokData}
        onEachFeature={onEachFeatureMap}
        style={getStyle}
      />
    ) : null;
  };
  const MokFeatData = () => {
    const map = useMap();

    const zoomToFeature = (e) => {
      map.fitBounds(e.target.getBounds());
    };

    const onEachFeatureMap = (feature, layer) => {
      layer.on({
        click: zoomToFeature,
      });
      if (feature.properties && feature.properties.name) {
        layer.bindPopup(
          "<strong>" + feature.properties.name + "</strong>"
        );
      }
    };

    const getStyle = (feature) => {
      const layerId = feature.id;
      return featureStyles[layerId] || {
        color: '#ffa0a0',
        weight: 2,
        fillOpacity: 0.5
      };
    };

    return mokFeatData ? (
      <GeoJSON
        data={mokFeatData}
        onEachFeature={onEachFeatureMap}
        style={getStyle}
      />
    ) : null;
  };
  // Map Printing
  const mapRef = useRef();
  const handlePrintToPDF = async () => {
    const element = mapRef.current;
    const canvas = await html2canvas(element, {
      useCORS: true,
      logging: true,
      scrollX: 0,
      scrollY: 0,
      windowWidth: document.documentElement.offsetWidth,
      windowHeight: document.documentElement.offsetHeight
    });
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
          <LayersControl position="topright">
            <LayersControl.Overlay name="Esri Imagery">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png"
              />
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Kapsiwon Tea">
              <MyData />
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Kapsiwon Features">
              <MyAdditionalData />
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Taito Tea">
              <TaiData />
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Taito Features">
              <TaiFeatData />
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Mokong Tea">
              <MokData />
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Mokong Features">
              <MokFeatData />
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
