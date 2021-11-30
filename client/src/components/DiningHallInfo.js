import React, {useState, useEffect} from 'react';
import { useLocation } from "react-router-dom";
//import { baseModelName } from '../../../api/models/diningHall.model';
import '../css/DiningHallInfo.css'
var axios = require('axios');

// Functional component representing a menu item (dish) 
function MenuItem(props) {
  const dishName = props.dishName
  const calories = props.calories
  const rating = props.rating
  const desc = props.desc
  const [showingPopUp, setShowingPopUp] = useState(false)
  return (
    <li className = "MenuItem">
      <h2
      onMouseEnter={() => setShowingPopUp(true)}
      onMouseLeave={() => setShowingPopUp(false)}
      >
        {dishName}
      </h2>
      {showingPopUp && (
        <div className  ="ItemDescription" >
          <h3>"<i>{desc}</i>"</h3>
          <h3>Calories: {calories}</h3>
        </div>
      )}
    </li>
  )
}

function Menu(props) {
  var data = props.data
  var dishes = []
  for (let i = 0; i < data.length; i++) {
    dishes.push(
      <MenuItem key={data[i].dishName} dishName={data[i].dishName} desc="Breaded and fried to perfection." calories={data[i].calories}/>
    )
  }
  const [sortOrder, setSortOrder] = useState("alpha-asc")
  switch(sortOrder){
    case "alpha-asc":
      
      break;

    case "alpha-desc":
      break;
  }
  console.log(data)

  return(
    <div>
      <SearchSelector/>
      {dishes}
    </div>
  )
}

// component for a generic review 
function Review(props) {
  return (
    <div className="Comment">
      <div className="Toprow">
        <h3>{props.username}</h3>
        <h3>at {props.time}:</h3>
      </div>
      <h4>Rating: {props.rating}</h4>
      <p>{props.content}</p>
    </div>
  );
}

function SearchSelector(props) {
  return(
    <label>Sort By:
    <select name="Sort Selector" id="selector">
      <option value="alpha-asc">Alphabetical (ascending)</option>
      <option value="alpha-desc">Alphabetical (descending)</option>
    </select> </label>
  )
}

function DiningHallInfo(props) {
  const today = new Date();
  const path = useLocation().pathname;
  const name = path.substring(path.lastIndexOf("/") + 1).replace("%20", " ");
  const reviewEndpoint = "http://localhost:5000/dininghall/"+name;


  const [review, setReview] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [diningHallData, setData] = useState({
    "name": "undefined",
    "population": "undefined",
    "_id": "undefined"
  })

  const [menuData, setMenuData] = useState({});
  

  const getDiningHallData = async () => {
    const response = await fetch(reviewEndpoint);
    const resJSON = await response.json();
    const jsonReviews = resJSON;
    console.log(resJSON);
    setReview(jsonReviews.reviews);
    setData(jsonReviews)
    setMenuData(jsonReviews.menu)
  }

  useEffect(() => {
    getDiningHallData();
  }, []);
  // Will import menu entries using server-side data
  // Using hard-coded examples for now
  var menu = [
    <MenuItem key="Chicken Tenders" dishName="Chicken Tenders" desc="Breaded and fried to perfection." rating="5"/>,
    <MenuItem key="Pizza" dishName="Pizza" desc="Delicious and made fresh." rating="3"/>
  ]

  const dataToComment = Array.from(review).map((e) => {
    return(
      <Review 
        username={e.username}
        rating={e.rating}
        time={e.time}
        content={e.body}
      />
    )
  })

  const checkIfCheckedIn = () => {
    if (!props.currUser) { return; }
    axios.get("/users/"+props.currUser)
    .then(response => {
      console.log(response);
      const isChecked = ("currentDiningHall" in response.data && response.data.currentDiningHall !== "") ? true : false;
      setCheckedIn(isChecked);
      console.log(isChecked);
    })
    .catch(error => {
      setErrorMsg("ERROR: " + error);
    });
  }

  const [checkedIn, setCheckedIn] = React.useState(false);
  useEffect(() => {
    checkIfCheckedIn();
  }, []);

  function checkIn() {
    checkIfCheckedIn();
    if (checkedIn) {
      setErrorMsg("Already checked-in");
      console.log("Already checked-in");
      return;
    }
    if (!props.currUser) {
      setErrorMsg("Must be signed-in to check-in");
      console.log("Must be signed-in to check-in");
      return;
    }
    axios.patch("/dininghall/checkIn", {hallName: name, username: props.currUser})
    .then(response => {
      setErrorMsg("");
      console.log(response);
      checkIfCheckedIn();
    })
    .catch(error => {
      setErrorMsg("ERROR: " + error);
      console.log("ERROR: " + error);
    });
    
    /*
    axios.post('/users/check', {in: true, diningHall: name})
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log("ERROR: " + error)
    }); */
  }

  function checkOut() {
    checkIfCheckedIn();
    if (!checkedIn) {
      setErrorMsg("Not checked-in");
      console.log("Not checked-in");
      return;
    }
    if (!props.currUser) {
      setErrorMsg("Must be signed-in to check-out");
       console.log("Must be signed-in to check-out");
       return;
    }
    axios.patch("/dininghall/checkOut", {hallName: name, username: props.currUser})
    .then(response => {
      setErrorMsg("");
      console.log(response);
      checkIfCheckedIn();
    })
    .catch(error => {
      setErrorMsg("ERROR: " + error);
      console.log("ERROR: " + error);
    });
    
  }


  //console.log(document.getElementById("selector").value)

  return(
    <div className="dininghallinfo">
      <h1> {diningHallData.name} Menu for {today.toLocaleDateString()} </h1>
      
      <div>{errorMsg}</div>
      {!checkedIn && 
        <button disable={!checkedIn} onClick={checkIn}>Check In</button>
      }  
      {checkedIn && 
        <button disable={checkedIn} onClick={checkOut}>Check Out</button>
      }
      {/* <SearchSelector/>
      {menu} */}
      <Menu data={menuData}/>
      <h1>Reviews</h1>
      {dataToComment}
    </div>
  )
}

export default DiningHallInfo;