// import React, { useContext } from 'react';
// import tokml from 'tokml'
// import { EditContext } from '../Context/EditDataContext';

// const KmlDownloader = () => {
//   const { data } = useContext(EditContext);

//   const downloadKml = () => {
//     if (!data) {
//       alert('No data available to download');
//       return;
//     }

//     const kml = tokml(data);

//     // Create a blob with the KML data
//     const blob = new Blob([kml], { type: 'application/vnd.google-earth.kml+xml' });
//     const url = URL.createObjectURL(blob);

//     // Create a link and trigger a download
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'data.kml';
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <button onClick={downloadKml}>Download KML</button>
//   );
// };

// export default KmlDownloader;

// DownloadKML.js

import React, { useState, useContext } from 'react';
import { EditContext } from '../../Context/EditDataContext';
import { convertToKML } from './ToKML';
import { saveAs } from 'file-saver';

const DownloadKML = () => {
  const { data, filter, mokData,taiData, fetchMultipolygonData } = useContext(EditContext);
  const [downloading, setDownloading] = useState(false);
  const [kmlData, setKmlData] = useState(null);

//   const handleFetchData = () => {
//     fetchMultipolygonData();
//   };

//   const handleDownloadKML = () => {
//     if (!data) return;
//     const kml = convertToKML(data);
//     const blob = new Blob([kml], { type: 'application/vnd.google-earth.kml+xml' });
//     saveAs(blob, 'multipolygon_data.kml');
//   };

const handleDownloadKML = () => {
    let dataToConvert = null;
    if (filter === 'kapData') {
      dataToConvert = data;
    } else if (filter === 'taiData') {
      dataToConvert = taiData;
    } else if (filter === 'mokData') {
        dataToConvert = mokData;
      }

    if (!dataToConvert) return;

    const kml = convertToKML(dataToConvert);
    const blob = new Blob([kml], { type: 'application/vnd.google-earth.kml+xml' });
    saveAs(blob, `${filter}_data.kml`);
  };

return (
    <div>
      {/* <button onClick={handleFetchData}>Fetch Multipolygon Data</button> */}
      <button onClick={handleDownloadKML} disabled={!data}>Download KML</button>
    </div>
  );
};

export default DownloadKML;

