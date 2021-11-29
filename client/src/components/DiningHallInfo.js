import React, {useState, useEffect} from 'react';
import { useLocation } from "react-router-dom";
import '../css/DiningHallInfo.css'
var axios = require('axios');

// Functional component representing a menu item (dish) 
function MenuItem(props) {
  const dishName = props.dishName
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
          <h3>Rating: {rating}/5</h3>
        </div>
      )}
    </li>
  )
}

// component for a generic review 
function Review(props) {
  return (
    <div className="Comment">
      <div className="Toprow">
        <h3>{props.username}</h3>
        <h3>Rating: {props.rating}</h3>
      </div>
      <p>{props.content}</p>
    </div>
  );
}

function DiningHallInfo(props) {
  const today = new Date()
  const path = useLocation().pathname
  const name = path.substring(path.lastIndexOf("/") + 1).replace("%20", " ")
  const reviewEndpoint = "http://localhost:5000/dininghall/"+name;

  const [review, setReview] = useState({
    "user": "undefined",
    "rating": "undefined",
    "timestamp": "undefined",
    "content": "undefined"
  });

  const [diningHallData, setData] = useState({
    "name": "undefined",
    "population": "undefined",
    "_id": "undefined"
  })

  const getDiningHallData = async () => {
    const response = await fetch("http://localhost:3000/dininghall/"+name);
    const resJSON = await response.json();
    const jsonReviews = resJSON;
    console.log(resJSON);
    setReview(jsonReviews);
    setData(jsonReviews)
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
        content={e.content}
      />
    )
  })

  const [checkedIn, setCheckedIn] = React.useState(false);

  function checkIn() {
    if (checkedIn) {
      console.log("Already checked-in")
      return
    }
    // if (!props.currUser) {
    //   console.log("Must be signed-in to check-in")
    // }
    setCheckedIn(true)
    axios.patch("/dininghall/checkIn/"+name)
    .then(response => {

    })
    .catch(error => {
      console.log("ERROR: " + error)
    });
  }

  return(
    <div className="dininghallinfo">
      <h1> {diningHallData.name} Menu for {today.toLocaleDateString()} </h1>
      <button disable={!checkedIn} onClick={checkIn}>Check In</button>
      {menu}
      <h1>Reviews</h1>
      {dataToComment}
    </div>
  )
}

export default DiningHallInfo;