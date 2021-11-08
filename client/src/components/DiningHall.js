import React, {useState} from 'react';
import './DiningHall.css';

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

export default DiningHall; 