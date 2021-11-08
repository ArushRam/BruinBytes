import React, {useState} from 'react';
import './DiningHallContainer.css';
import DiningHall from './DiningHall.js';

function DiningHallContainer(props) {
  return (
    <div className="container">
      <DiningHall
        name="De Neve"
        capacity={2}
      />
    </div>
  );
}

export default DiningHallContainer; 