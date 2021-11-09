import React, {useState} from 'react';
import './DiningHallContainer.css';

import DeNeve from '../images/De-Neve-Plaza.jpg';
import BPlate from '../images/BPlate.jpg';


function DiningHall(props) {
  return (
    <div className="dininghall">
      <img src={props.image} alt={props.name}/>
      <h1>{props.name}</h1>
      <h3>Capacity: {props.capacity}/3</h3>
      <button>View Menu</button>
    </div>
  );
}


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