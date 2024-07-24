import React, {
  useMemo,
  useState,
  useCallback,
  useContext,
  useRef,
  useEffect
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
import { EditContext } from "../../Context/EditDataContext";
//import { MapRefContext } from "../../Context/MapRefContext";
import { useMapRef } from "../../Context/MapRefContext";
import Legend from "./Legend";
import L from "leaflet";
import tankIcon from "../../assets/tank.png"
import locationIcon from "../../assets/location.png"
import locationPin from "../../assets/location-pin.png"
import locationMok from "../../assets/location1.png"
import markerLoc from  "../../assets/gps1.png"
import gpsIcon from "../../assets/gps.png"
//import { PrintContextConsumer } from "react-to-print";
import PrintMap from "../Printer";
//import DivisionFilter from "./DivisionFilter";

//const PrintControl = withLeaflet(PrintControlDefault);
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
  const { filter, data, featureStyles, kapData, taiData, taiFeatData, mokData, mokFeatData, mokPoint, taiPoint, kapPoint } = useContext(EditContext);
  // Map Printing
  //const mapRef = mapContainerRef();
  // const mapContainerRef = useRef(null);
  const mapRef = useMapRef();
  const componentRef = useRef();
  const printControlRef = useRef();

  const handlePrint = () => {
    if (componentRef.current) {
      printJS({
        printable: componentRef.current,
        type: 'html',
        targetStyles: ['*']
      });
    } else {
      console.error('componentRef is undefined');
    }
  };


  //   const handlePrint = () => {
  //   if (mapRef.current) {
  //     const mapCanvas = document.querySelector('.leaflet-container');
  //     const printWindow = window.open('', '', 'width=800,height=600');
  //     printWindow.document.write('<html><head><title>Print Map</title>');
  //     printWindow.document.write('</head><body>');
  //     printWindow.document.write(mapCanvas.outerHTML);
  //     printWindow.document.write('</body></html>');
  //     printWindow.document.close();
  //     printWindow.focus();
  //     printWindow.print();
  //     printWindow.close();
  //   }
  // };

  const getFeatureStyle = (feature) => {
    switch (feature.properties.feature) {
      case 'Division Office':
        return {
          color: 'blue',
          weight: 2,
          fillOpacity: 0.5,
        };
      case 'Fertilizer Store':
          return {
            color: '#071952',
            weight: 2,
            fillOpacity: 0.5,
          };
      case "Chief's Camp":
          return {
            color: '#088395',
            weight: 2,
            fillOpacity: 0.5,
          };
      case 'Dispensary':
        return {
          color: 'yellow',
          weight: 2,
          fillOpacity: 0.5,
        };
      case 'Blue Gum Forest':
          return {
            color: '#00b300',
            weight: 2,
            fillOpacity: 0.5,
          };
      case 'Social Hall':
          return {
            color: '#AA2B1D',
            weight: 2,
            fillOpacity: 0.5,
          };
      case 'School':
            return {
              color: '#686D76',
              weight: 2,
              fillOpacity: 0.5,
            };
      case 'Settlement':
              return {
                color: '#CC561E',
                weight: 2,
                fillOpacity: 0.5,
              };
      case 'Swampy Area':
                return {
                  color: '#40A7F9',
                  weight: 2,
                  fillOpacity: 0.5,
                };
      default:
        return {
          color: '#00b300',
          weight: 2,
          fillOpacity: 0.5,
        };
    }
  };

  const getFilteredData = () => {
    switch (filter) {
      case 'Kapsiwon Division':
        return data;
      case 'Taito Division':
        return taiData;
      case 'Mokong Division':
        return mokData;
      // Add cases for additional datasets as needed
      default:
        return null; // Handle default case or no filter selected
    }
  };

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
        layer.bindPopup("<strong>" + feature.properties.field_code + "</strong>" + "<br>" + feature.properties.feature + "<br>" + feature.properties.area + " <strong>Ha</strong>");
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

    return kapData ? (
      <GeoJSON
        data={kapData}
        onEachFeature={onEachFeatureMap}
        style={getFeatureStyle}
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
  const TaiPoint = () => {
    const map = useMap();

    const zoomToFeature = (e) => {
      map.setView(e.latlng, 16); // Adjust the zoom level as needed
    };
  
    const getMarkerIcon = (feature) => {
      let iconUrl;
  
      switch (feature.properties.feature) {
        case 'Shades':
          iconUrl = locationPin // Replace with your shade icon URL
          break;
        case 'Water Tank':
          iconUrl = locationMok; // Replace with your water tank icon URL
          break;
        default:
          iconUrl = markerLoc; // Replace with your default icon URL
      }
  
      return L.icon({
        iconUrl,
        iconSize: [25, 41], // Adjust the size as needed
        iconAnchor: [12, 41], // Adjust the anchor point as needed
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
    };
  
    return (
      <>
        {taiPoint && taiPoint.features.map((feature) => (
          <Marker
            key={feature.properties.id}
            position={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]}
            icon={getMarkerIcon(feature)}
            eventHandlers={{
              click: zoomToFeature,
            }}
          >
            <Popup>
              <strong>{feature.properties.name}</strong><br />
              {feature.properties.feature}<br />
            </Popup>
          </Marker>
        ))}
      </>
    );
  };

  const KapPoint = () => {
    const map = useMap();

    const zoomToFeature = (e) => {
      map.setView(e.latlng, 16); // Adjust the zoom level as needed
    };
  
    const getMarkerIcon = (feature) => {
      let iconUrl;
  
      switch (feature.properties.feature) {
        case 'Shade':
          iconUrl = locationIcon // Replace with your shade icon URL
          break;
        case 'Water Tank':
          iconUrl = tankIcon; // Replace with your water tank icon URL
          break;
        default:
          iconUrl = locationIcon; // Replace with your default icon URL
      }
  
      return L.icon({
        iconUrl,
        iconSize: [25, 41], // Adjust the size as needed
        iconAnchor: [12, 41], // Adjust the anchor point as needed
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
    };
  
    return (
      <>
        {kapPoint && kapPoint.features.map((feature) => (
          <Marker
            key={feature.properties.id}
            position={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]}
            icon={getMarkerIcon(feature)}
            eventHandlers={{
              click: zoomToFeature,
            }}
          >
            <Popup>
              <strong>{feature.properties.name}</strong><br />
              {feature.properties.feature}<br />
            </Popup>
          </Marker>
        ))}
      </>
    );
  };

  const MokPoint = () => {
    const map = useMap();

    const zoomToFeature = (e) => {
      map.setView(e.latlng, 16); // Adjust the zoom level as needed
    };
  
    const shadesLayer = L.layerGroup();
    const waterTanksLayer = L.layerGroup();

    const getMarkerIcon = (feature) => {
      let iconUrl;
  
      switch (feature.properties.feature) {
        case 'Shades':
          iconUrl = gpsIcon // Replace with your shade icon URL
          break;
        case 'Water Tank':
          iconUrl = markerLoc; // Replace with your water tank icon URL
          break;
        default:
          iconUrl = markerLoc; // Replace with your default icon URL
      }
  
      return L.icon({
        iconUrl,
        iconSize: [25, 41], // Adjust the size as needed
        iconAnchor: [12, 41], // Adjust the anchor point as needed
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
    };

  
    return (
      <>
        {mokPoint && mokPoint.features.map((feature) => (
          <Marker
            key={feature.properties.id}
            position={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]}
            icon={getMarkerIcon(feature)}
            eventHandlers={{
              click: zoomToFeature,
            }}
          >
            <Popup>
              <strong>{feature.properties.name}</strong><br />
              {feature.properties.feature}<br />
            </Popup>
          </Marker>
        ))}
      </>
    );
  };
  // const MokPoint = () => {
  //   const map = useMap();

  //     const shadesLayer = L.layerGroup();
  //     const waterTanksLayer = L.layerGroup();
  
  //     const zoomToFeature = (e) => {
  //       map.setView(e.latlng, 16); // Adjust the zoom level as needed
  //     };
  
  //     const getMarkerIcon = (feature) => {
  //       let iconUrl;
  
  //       switch (feature.properties.feature) {
  //         case 'Shades':
  //           iconUrl = gpsIcon; // Replace with your shade icon URL
  //           break;
  //         case 'Water Tank':
  //           iconUrl = markerLoc; // Replace with your water tank icon URL
  //           break;
  //         default:
  //           iconUrl = markerLoc; // Replace with your default icon URL
  //       }
  
  //       return L.icon({
  //         iconUrl,
  //         iconSize: [25, 41], // Adjust the size as needed
  //         iconAnchor: [12, 41], // Adjust the anchor point as needed
  //         popupAnchor: [1, -34],
  //         shadowSize: [41, 41]
  //       });
  //     };
  
  //     mokPoint.features.forEach((feature) => {
  //       const marker = L.marker(
  //         [feature.geometry.coordinates[1], feature.geometry.coordinates[0]],
  //         { icon: getMarkerIcon(feature) }
  //       ).bindPopup(`
  //         <strong>${feature.properties.name}</strong><br />
  //         ${feature.properties.feature}<br />
  //       `);
  
  //       marker.on('click', zoomToFeature);
  
  //       if (feature.properties.feature === 'Shades') {
  //         shadesLayer.addLayer(marker);
  //       } else if (feature.properties.feature === 'Water Tank') {
  //         waterTanksLayer.addLayer(marker);
  //       }
  //     });
  
  //     shadesLayer.addTo(map);
  //     waterTanksLayer.addTo(map);
  
  //     L.control.layers(null, {
  //       'Shades': shadesLayer,
  //       'Water Tanks': waterTanksLayer,
  //     }).addTo(map);
  
  //     return () => {
  //       map.removeLayer(shadesLayer);
  //       map.removeLayer(waterTanksLayer);
  //     };
    
  
  //   return null;
  // };

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

    // const getStyle = (feature) => {
    //   const layerId = feature.id;
    //   return featureStyles[layerId] || {
    //     color: '#a52a2a',
    //     weight: 2,
    //     fillOpacity: 0.5
    //   };
    // };
    

    return taiFeatData ? (
      <GeoJSON
        data={taiFeatData}
        onEachFeature={onEachFeatureMap}
        style={getFeatureStyle}
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
        color: '#597445',
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

    return mokFeatData ? (
      <GeoJSON
        data={mokFeatData}
        onEachFeature={onEachFeatureMap}
        style={getFeatureStyle}
      />
    ) : null;
  };

  const renderFilteredComponent = () => {
    switch (filter) {
      case 'taiData':
        return <TaiData />;
      case 'mokData':
        return <MokData />;
      case 'kapData':
        return <MyData />;
      default:
        return null; // Handle default case or no filter selected
    }
  };
  const handleDownloadPDF = async () => {
    const element = mapContainerRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape',
    });
    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('map.pdf');
  };
  return (
    <div>
      <div className="h-full" ref={componentRef}>
        {/* <DivisionFilter/> */}
        <MapContainer center={[0.116, 35.189]} zoom={14} scrollWheelZoom={true} whenCreated={mapInstance => { mapRef.current = mapInstance }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
           {/* <PrintControl
                ref={printControlRef}
                position="topleft"
                sizeModes={["Current", "A4Portrait", "A4Landscape"]}
                hideControlContainer={false}
              />
              <PrintControl
                position="topleft"
                sizeModes={["Current", "A4Portrait", "A4Landscape"]}
                hideControlContainer={false}
                title="Export as PNG"
                exportOnly
              /> */}
          <LayersControl position="topright">
            <LayersControl.Overlay name="Esri Imagery">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png"
              />
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Google Terrain">
              <TileLayer
                attribution='&copy; <a href="https://www.Google.com/copyright">OpenStreetMap</a> contributors'
                url="http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}"
              />
            </LayersControl.Overlay>
            
            <LayersControl.Overlay name="Google Hybrid">
              <TileLayer
                attribution='&copy; <a href="https://www.Google.com/copyright">OpenStreetMap</a> contributors'
                url="http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}"
              />
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Kapsiwon Tea">
              {filter === 'kapData' && <MyData />}
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Kapsiwon Features">
              <MyAdditionalData />
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Taito Tea">
              {filter === 'taiData' && <TaiData />}
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Taito Features">
              <TaiFeatData />
            </LayersControl.Overlay>
            <LayersControl.Overlay  checked name="Mokong Tea">
              {filter === 'mokData' && <MokData />}
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Mokong Features">
              <MokFeatData />
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Mokong Shades">
              <MokPoint />
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Kapsiwon Shades">
              <KapPoint />
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Taito Shades">
              <TaiPoint />
            </LayersControl.Overlay>
          </LayersControl>
          <MinimapControl position="bottomleft" />
          <LocationFinderDummy />
          {/* {renderFilteredComponent()} */}
        </MapContainer>
        <Legend />
      </div>
      {/* <PrintMap /> */}
      {/* <button onClick={handlePrint}>Print Map</button> */}
    </div>
  );
}

export default Map;
