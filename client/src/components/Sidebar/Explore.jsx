import React, { useState,useContext, useEffect, useRef } from 'react'
import { MapContext } from '../../Context/MapContext';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function Explore() {
  const [markerLocation, setMarkerLocation] = useContext(MapContext)
  const [areaSpecies, setAreaSpecies] = useState(""); 
  const [areaName, setAreaName] = useState("");
  const [mapDataPrint, setMapDataPrint] = useState([]);
  const mapRef = useRef();

    useEffect(() => {
      const getArea = async () => {
        const result = await axios.get(
          "http://localhost:8000/api/v1/distance/get_Location/", {
            params: {
              lat:markerLocation.lat,
              lng:markerLocation.lng
            }
          }
        );
        const locName=result.data;
        setAreaName(locName.features[0].properties.name_4);
        //setAreaName(result.data);
      };
      getArea();
    }, [markerLocation]);

    useEffect(() => {
      const getSpecies = async () => {
        const species = await axios.get(
          "http://localhost:8000/api/v1/species/species_within/", {
            params: {
              lat:markerLocation.lat,
              lng:markerLocation.lng
            }
          }
        );
        const specData=species.data;
        setAreaSpecies(specData.features[0].properties.species);
      };
      getSpecies();
    }, [markerLocation]);

    // var speci = areaSpecies.features
    // var feat = areaName.features
    //console.log(speci);
    //console.log(Object.entries(speci));

    // Map Printing
    useEffect(() => {
      // Fetch the map data from the API
      axios.get('http://localhost:8000/api/v1/Factories/')
          .then(response => {
              setMapDataPrint(response.data);
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
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
          >
            Factory
          </label>
          <input
            type="area"
            id="password"
            placeholder="Factory name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            disabled
            readOnly
          />
        </div>
        <div className="mb-6">
          {/* {Object.entries(speci).map(
            ([key, value]) => html`
              <div class="card shadow p-3 m-3">
                <p>${key} : ${value}</p>
              </div>
            `
          )} */}
          <label
            htmlFor="Location"
            className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
          >
            Feature
          </label>
          <input
            type="area"
            id="password"
            placeholder={areaName}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            disabled
            readOnly
          />
        </div>
        {/* <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button> */}
        <button onClick={handlePrintToPDF}>Print Map to PDF</button>
      </form>
    </div>
  );
}

export default Explore