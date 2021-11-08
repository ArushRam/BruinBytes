import React, {useState} from 'react';
import './DiningHall.css';
import DeNeve from '../images/De-Neve-Plaza.jpg';

function DiningHall(props) {
  return (
    <div className="dininghall">
      <img src={DeNeve} alt="De Neve Plaza"/>
      <h1>{props.name}</h1>
      <h3>Capacity: {props.capacity}/3</h3>
      <button>View Menu</button>
    </div>
  );
}

export default DiningHall; 