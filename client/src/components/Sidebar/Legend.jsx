// components/Legend.js
import React from 'react';
import './Legend.css';
import markerLoc from  "../../assets/gps1.png"
import locationIcon from "../../assets/location.png"
import locationPin from "../../assets/location-pin.png"
import gpsIcon from "../../assets/gps.png"

const Legend = () => {
  return (
    <div className="legend">
      <h4>Map Legend</h4>
      <div className="legend-item">
        <span className="legend-color rounded" style={{ backgroundColor: '#597445' }}></span>
        <span className="legend-label">Tea Plantation</span>
      </div>
      <div className="legend-item">
        <span className="legend-color rounded" style={{ backgroundColor: '#00b300' }}></span>
        <span className="legend-label">Forest</span>
      </div>
      <div className="legend-item">
        <span className="legend-color rounded" style={{ backgroundColor: '#686D76' }}></span>
        <span className="legend-label">School</span>
      </div>
      <div className="legend-item">
        <span className="legend-color rounded" style={{ backgroundColor: '#CC561E' }}></span>
        <span className="legend-label">Settlement</span>
      </div>
      <div className="legend-item">
        <span className="legend-color rounded" style={{ backgroundColor: '#AA2B1D' }}></span>
        <span className="legend-label">Social Hall</span>
      </div>
      <div className="legend-item">
        <span className="legend-color rounded" style={{ backgroundColor: '#40A7F9' }}></span>
        <span className="legend-label">Swampy Area</span>
      </div>
      <div className="legend-item">
        <span className="legend-color rounded" style={{ backgroundColor: '#00b300' }}></span>
        <span className="legend-label">Blue Gum Forest</span>
      </div>
      <div className="legend-item">
        <span className="legend-color rounded" style={{ backgroundColor: 'yellow' }}></span>
        <span className="legend-label">Dispensary</span>
      </div>
      <div className="legend-item">
        <span className="legend-color rounded" style={{ backgroundColor: '#088395' }}></span>
        <span className="legend-label">Chief's Camp</span>
      </div>
      <div className="legend-item">
        <span className="legend-color rounded" style={{ backgroundColor: '#071952' }}></span>
        <span className="legend-label">Fertilizer</span>
      </div>
      <div className="legend-item">
        <img src={markerLoc} alt="Legend Item 1" />
        <span className="legend-label">Mokong Shades</span>
      </div>
      <div className="legend-item">
        <img src={locationPin} alt="Legend Item 1" />
        <span className="legend-label">Taito Shades</span>
      </div>
      <div className="legend-item">
        <img src={locationIcon} alt="Legend Item 1" />
        <span className="legend-label">Kapsiwon Shades</span>
      </div>
      {/* Add more legend items as needed */}
    </div>
  );
};

export default Legend;
