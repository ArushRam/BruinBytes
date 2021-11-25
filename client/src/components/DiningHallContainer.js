import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './DiningHallContainer.css';

import DeNeve from '../images/De-Neve-Plaza.jpg';
import BPlate from '../images/BPlate.jpg';
import Epi from '../images/Epi.jpg';


function DiningHall(props) {
  //  function that returns a generic dining hall using info from props
  return (
    <div className="dininghall" onClick={() => console.log("Click!")}>
      <Link to={"/"+props.name}>
      <img src={props.image} alt={props.name}/>
      <h1>{props.name}</h1>
      <h3>Capacity: {props.capacity}/3</h3>
      <h3>Today's rating: {props.rating}/5</h3>
      <button >View Menu</button>
      </Link>
    </div>
  );
}


function DiningHallContainer(props) {
  // element that contains all dining halls

  // replace this with .fetch() to api later
  const diningHallInfo = 
  [
    {
      name: "De Neve",
      capacity: 2,
      rating: 2.4,
      image: DeNeve
    },
    {
      name: "BPlate",
      capacity: 1,
      rating: 4.6,
      image: BPlate
    },
    {
      name: "Epicuria",
      capacity: 3,
      rating: 4.5,
      image: Epi
    }
  ]

  // mapping function: maps array of dining hall info to dining hall component
  const infoToComponent = diningHallInfo.map((e) => {
    return (
      <DiningHall
        name={e.name}
        capacity={e.capacity}
        rating={e.rating}
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