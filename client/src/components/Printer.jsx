import React, { useState,useContext, useEffect, useRef } from 'react'
import axios from 'axios'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const MapComponent = () => {
    const [mapData, setMapData] = useState([]);
    const mapRef = useRef();

    useEffect(() => {
        // Fetch the map data from the API
        axios.get('http://localhost:8000/api/v1/Factories/')
            .then(response => {
                setMapData(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the map data!", error);
            });
    }, []);

    const handlePrint = useReactToPrint({
        content: () => mapRef.current,
    });

    const handlePrintToPDF = async () => {
        const element = mapRef.current;
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save("map.pdf");
    };

    return (
        <div>
            <div ref={mapRef} style={{ height: '500px', width: '100%' }}>
                <MapContainer center={[0.116, 35.189]} zoom={13} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {mapData.map(factory => (
                        <Marker key={factory.id} position={[factory.location.lat, factory.location.lng]}>
                            <Popup>
                                {factory.name}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
            <button onClick={handlePrintToPDF}>Print Map to PDF</button>
        </div>
    );
};

export default MapComponent;

