// import React, { useContext } from 'react';
// import { useMapRef } from '../Context/MapRefContext';

// const PrintMap = () => {
//   const mapRef = useMapRef();

//   const handlePrint = () => {
//     if (mapRef.current) {
//       const mapCanvas = document.querySelector('.leaflet-container');
//       const printWindow = window.open('', '', 'width=800,height=600');
//       printWindow.document.write('<html><head><title>Print Map</title>');
//       printWindow.document.write('</head ><body>');
//       printWindow.document.write(mapCanvas.outerHTML);
//       printWindow.document.write('</body></html>');
//       printWindow.document.close();
//       printWindow.focus();
//       printWindow.print();
//       printWindow.close();
//     }
//   };

//   return (
//     <button onClick={handlePrint}>Print Map</button>
//   );
// };

// export default PrintMap;
import React from 'react';
import printJS from 'print-js';

const PrintButton = ({ componentRef }) => {
  const handlePrint = () => {
    printJS({
      printable: componentRef.current,
      type: 'html',
      targetStyles: ['*']
    });
  };

  return (
    <button onClick={handlePrint} className="print-button">
      Print Map
    </button>
  );
};

export default PrintButton;

