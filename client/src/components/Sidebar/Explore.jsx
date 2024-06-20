import React, { useState, useContext, useEffect, useRef } from 'react'
import { MapContext } from '../../Context/MapContext';
import axios from 'axios';
import LayerStyleControls from './LayerControlsStyle';
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import DivisionFilter from './DivisionFilter';

function Explore() {
  const [markerLocation, setMarkerLocation] = useContext(MapContext)
  const [areaName, setAreaName] = useState("");

  useEffect(() => {
    const getArea = async () => {
      const result = await axios.get(
        "http://localhost:8000/api/v1/distance/get_Location/", {
        params: {
          lat: markerLocation.lat,
          lng: markerLocation.lng
        }
      }
      );
      const locName = result.data;
      setAreaName(locName.features[0].properties.name_4);
      //setAreaName(result.data);
    };
    getArea();
  }, [markerLocation]);

  return (
    <div className="m-2 h-screen ">
      <form>
        <div>
          <label
            htmlFor="location"
            className="block text-base font-semibold text-gray-900"
          >
            Select Location
          </label>
          <label className="italic mb-2 text-sm">
            Select a point on the map.
          </label>
          <div className="mb-4 flex gap-2">
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder={markerLocation.lat}
              disabled
              readOnly
            />
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={markerLocation.lng}
              disabled
              readOnly
            />
          </div>
        </div>
        <div className='mb-4'>
          <DivisionFilter />
        </div>
        <div className='italic font-bold mb-4'>
        Symbology
        </div>
        <div className='mb-4'>
          <LayerStyleControls />
        </div>
        {/* <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button> */}
        {/* <button onClick={handlePrintToPDF}>Print Map to PDF</button> */}
      </form>
    </div>
  );
}

export default Explore