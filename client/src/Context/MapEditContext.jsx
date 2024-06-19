import React, { createContext, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const MapEditContext = createContext();

const MapEditProvider = ({ children }) => {
    const mapRef = useRef();

    const handlePrintToPDF = async () => {
        const element = mapRef.current;
        if (element) {
            const canvas = await html2canvas(element);
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: [element.clientWidth, element.clientHeight]
            });
            pdf.addImage(imgData, 'PNG', 0, 0, element.clientWidth, element.clientHeight);
            pdf.save("map.pdf");
        }
    };

    return (
        <MapContext.Provider value={{ mapRef, handlePrintToPDF }}>
            {children}
        </MapContext.Provider>
    );
};

export { MapEditProvider, MapEditContext };
