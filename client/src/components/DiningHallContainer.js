import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './DiningHallContainer.css';

import DeNeve from '../images/DeNeveUCLA.jpg';
import BPlate from '../images/BplateUCLA.jpg';
import Epicuria from '../images/Epicuria.jpg';


function DiningHall(props) {
  return (
    <div className="dininghall" onClick={() => console.log("Click!")}>
      <Link to={"/"+props.name}>
      <img src={props.image} alt={props.name}/>
      <h1>{props.name}</h1>
      <h3>Capacity: {props.capacity}/3</h3>
      <button >View Menu</button>
      </Link>
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
    },
    {
      name: "Epicuria",
      capacity: "3",
      image: Epicuria
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