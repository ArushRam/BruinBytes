import React, {useState} from 'react';
import { useLocation } from "react-router-dom";
import './DiningHallInfo.css'

// Functional component representing a menu item (dish) 
function MenuItem(props) {
  const dishName = props.dishName
  const rating = props.rating
  const desc = props.desc
  const [showingPopUp, setState] = useState(false)
  return (
    <li className = "MenuItem">
      <h2
      onMouseEnter={() => setState(true)}
      onMouseLeave={() => setState(false)}
      >
        {dishName}
      </h2>
      {showingPopUp && (
        <div class="ItemDescription" >
          <h3>"<i>{desc}</i>"</h3>
          <h3>Rating: {rating}/5</h3>
        </div>
      )}
    </li>
  )
}

function DiningHallInfo(props) {
  const today = new Date()

  const path = useLocation().pathname
  const name = path.substring(path.lastIndexOf("/") + 1).replace("%20", " ")

  // Will import menu entries using server-side data
  // Using hard-coded examples for now
  var menu = [
    <MenuItem key="Chicken Tenders" dishName="Chicken Tenders" desc="Breaded and fried to perfection." rating="5"/>,
    <MenuItem key="Pizza" dishName="Pizza" desc="Delicious and made fresh." rating="3"/>
  ]

  return(
    <div className="dininghallinfo">
      <h1> {name} Menu for {today.toLocaleDateString()} </h1>
      {menu}
    </div>
  )
}

export default DiningHallInfo;