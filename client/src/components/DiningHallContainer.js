import React, {useState} from 'react';
import './DiningHallContainer.css';
import DiningHall from './DiningHall.js';

import DeNeve from '../images/De-Neve-Plaza.jpg';
import BPlate from '../images/BPlate.jpg';

function DiningHallContainer(props) {
  const diningHallInfo = 
  [
    {
      name: "De Neve",
      capacity: "2",
      image: DeNeve
    },
    {
      name: "BPlate",
      capacity: "1",
      image: BPlate
    }
  ]

  const infoToComponent = diningHallInfo.map((e) => {
    return (
      <DiningHall
        name={e.name}
        capacity={e.capacity}
        image={e.image}
      />
    );
  });


  return (
    <div className="container">
      {infoToComponent}
    </div>
  );
}

export default DiningHallContainer; 