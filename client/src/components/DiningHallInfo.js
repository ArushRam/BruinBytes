import React, {useState, useEffect} from 'react';
import { useLocation } from "react-router-dom";
import '../css/DiningHallInfo.css'
var axios = require('axios');

// Functional component representing a menu item (dish) 
function MenuItem(props) {
  const dishName = props.dishName
  const calories = props.calories
  const tags = props.tags
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
          <h3>Calories: {calories}</h3>
          <h3>Tags: {tags.join()}</h3>
        </div>
      )}
    </li>
  )
}

function Menu(props) {
  var data = Object.values(props.data)
  data.sort((a, b) => (a.dishName > b.dishName) ? 1 : -1)
  const [dishes, setDishes] = useState("undefined")
  const [sortType, setSortType] = useState("alpha-asc")
  const [filters, setFilters] = useState(
    new Array(false, false, false)
  )
  
  useEffect(() => {
    const sortArray = type => {
      data.sort((a, b) => {
        switch(type) {
          case "alpha-asc":
            return (a.dishName > b.dishName) ? 1 : -1
          case "alpha-desc":
            return (a.dishName < b.dishName) ? 1 : -1
          case "cal-asc":
            return (a.calories > b.calories) ? 1 : -1
          case "cal-desc":
            return (a.calories < b.calories) ? 1 : -1
        }
      });
      const sorted = data
      if (sorted.length > 0)
        setDishes(sorted);
    };
    sortArray(sortType);
    setFilters([false, false, false])  
  }, [sortType]);

  const handleOnChange = (i) => {
    const updatedFilters = filters.map((item, index) =>
      index === i ? !item : item
    );
    setFilters(updatedFilters)
    if ((updatedFilters[0] || updatedFilters[1] || updatedFilters[2]) === false) {
      setDishes(data)
      return
    }
      const filtered = new Array()
      for (let i = 0; i < data.length; i++) {
        if (updatedFilters[0] && !data[i].tags.includes("dairy"))
          continue;
        if (updatedFilters[1] && !data[i].tags.includes("vegan"))
          continue;
        if (updatedFilters[2] && !data[i].tags.includes("gluten"))
          continue;
        filtered.push(data[i])
      }
      setDishes(filtered)
  }

  if (dishes !== "undefined") {
    return (
      <div>
        <form>
          <label>
            Filter By: 
            <input className="Selectors" type="checkbox" value={filters[0]} checked={filters[0]} onChange={() => handleOnChange(0)}/>Dairy
            <input className="Selectors" type="checkbox" checked={filters[1]} onChange={() => handleOnChange(1)}/>Vegan
            <input className="Selectors" type="checkbox" checked={filters[2]} onChange={() => handleOnChange(2)}/>Gluten
          </label>
        </form>
        <div>Or</div>
        <label>Sort By:
          <select className="Selectors" onChange={e => setSortType(e.target.value)}>
            <option value="alpha-asc">Alphabetical (A-Z)</option>
            <option value="alpha-desc">Alphabetical (Z-A)</option>
            <option value="cal-asc">Calories (ascending)</option>
            <option value="cal-desc">Calories (descending)</option>
          </select>
        </label>
        
        {dishes.map(dish => (
          <MenuItem  key={dish.dishName} dishName={dish.dishName} desc="SAMPLE TEXT" calories={dish.calories} tags={dish.tags}/>
        ))}
      </div>
    )
  }
  else {
    return (
      <div>
        <form>
          <label>
            Filter By: 
            <input className="Selectors" type="checkbox" value={filters[0]} checked={filters[0]} onChange={() => handleOnChange(0)}/>Dairy
            <input className="Selectors" type="checkbox" checked={filters[1]} onChange={() => handleOnChange(1)}/>Vegan
            <input className="Selectors" type="checkbox" checked={filters[2]} onChange={() => handleOnChange(2)}/>Gluten
          </label>
        </form>
        <div>Or</div>
        <label>Sort By:
          <select className="Selectors" onChange={e => setSortType(e.target.value)}>
            <option value="alpha-asc">Alphabetical (A-Z)</option>
            <option value="alpha-desc">Alphabetical (Z-A)</option>
            <option value="cal-asc">Calories (ascending)</option>
            <option value="cal-desc">Calories (descending)</option>
          </select>
        </label>
        
        {data.map(dish => (
          <MenuItem  key={dish.dishName} dishName={dish.dishName} desc="SAMPLE TEXT" calories={dish.calories} tags={dish.tags}/>
        ))}
      </div>
    )
  }
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
  return(
    <div className="dininghallinfo">
      <h1> {diningHallData.name} Menu for {today.toLocaleDateString()} </h1>
      <div>{errorMsg}</div>
      {!checkedIn && 
        <button className="button3" disable={!checkedIn} onClick={checkIn}>Check In</button>
      }  
      {checkedIn && 
        <button className="button3" disable={checkedIn} onClick={checkOut}>Check Out</button>
      }
      <h1>Today's Menu</h1>
      <Menu data={menuData}/>
      <h1>Reviews</h1>
      {dataToComment}
    </div>
  )
  
}

export default DiningHallInfo;