import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../css/DiningHallContainer.css';

import DeNeve from '../images/DeNeveUCLA.jpg';
import BPlate from '../images/BplateUCLA.jpg';
import Epi from '../images/Epicuria.jpg';
import BCafe from '../images/BCafe.jpg'
import Study from '../images/Study.jpg'
import RendeWest from '../images/RendeWestUCLA.jpg'
import RendeEast from '../images/RendeEastUCLA.jpg'

var axios = require('axios');

// api to get all dining hall data
const endpoint = "http://localhost:5000/dininghall";
// dict of name to images, terrible way of doing this but oh well...
const diningHallInfo = {
  "De Neve" : DeNeve,
  "BPlate": BPlate,
  "Epicuria": Epi,
  "Bruin Cafe": BCafe,
  "The Study": Study,
  "Rendezvous West": RendeWest,
  "Rendezvous East": RendeEast  
};

function DiningHall(props) {
  
  return (
    <div className="dininghall" onClick={() => console.log("Click!")}>
      <Link to={{
        pathname:"/dininghall/"+props.name,
        }}>

      <img src={props.image} alt={props.name}/>
      <h1>{props.name}</h1>
      <h3>At {props.crowdPercent}% capacity</h3>
      <h3>Today's rating: {props.rating}/5</h3>
      <button >View Menu</button>
      </Link>
    </div>
  );
}

function DiningHallContainer(props) {
  // element that contains all dining halls

  // state of dininghall data
  const [dininghallData, setDiningHallData] = useState(
    // template of api response, update later
    []
  );


  const getDiningHallData = () => {
    axios.get(endpoint).then(diningHalls => {
      setDiningHallData(diningHalls.data);
    });
;  }
  // calls getDiningHallData() every rendering (defined as '[]'), maybe later add 5 sec counter
  useEffect(() => {
    getDiningHallData();
  }, []);


  
  // mapping function: maps array of dining hall info to dining hall component
  const infoToComponent = Array.from(dininghallData).map((e) => {
    return (
      <DiningHall
        name={e.name}
        crowdPercent={Math.round(e.population/e.capacity * 100)}
        rating={Number.parseFloat(e.rating).toFixed(1)}
        image={diningHallInfo[e.name]}
        currUser={props.currUser}
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
