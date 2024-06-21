// components/Legend.js
import React from 'react';
import './Legend.css';

const Legend = () => {
  return (
    <div className="legend">
      <h4>Map Legend</h4>
      <div className="legend-item">
        <span className="legend-color rounded" style={{ backgroundColor: 'blue' }}></span>
        <span className="legend-label">Tea Plantation</span>
      </div>
      <div className="legend-item">
        <span className="legend-color rounded" style={{ backgroundColor: 'red' }}></span>
        <span className="legend-label">Forest</span>
      </div>
      {/* Add more legend items as needed */}
    </div>
  );
};

export default Legend;
