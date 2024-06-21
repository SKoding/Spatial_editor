// PrintButton.js
import React from 'react';
import { useMapRef } from '../Context/MapRefContext';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const PrintButton = () => {
  const mapRef = useMapRef();

  const handlePrintToPDF = async () => {
    const map = mapRef.current;
    map.invalidateSize(); // Ensure the map is fully rendered and centered

    const element = map.getContainer();
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
      format: [canvas.width, canvas.height]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save("map.pdf");
  };

  return <button    onClick={handlePrintToPDF}>Print Map</button>;
};

export default PrintButton;
