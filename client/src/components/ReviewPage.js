import React, {useState} from 'react';
import { Navigate } from 'react-router';
import '../css/ReviewPage.css';
var axios = require('axios');


function Review(props) {
  // object containing parts of the user review
  
  const [userInput, setUserInput] = useState(
    {
      dininghall: "De Neve",
      review: "",
      rating: "",
      username: null,
      currTime: "00:00 PM"
    }
  );
  const [errorMsg, setErrorMsg] = useState("");

  const getLocalTime = () => {
    const today = new Date();
    const time = today.getTime();
    const localOffset = today.getTimezoneOffset() * 60000;
    const utc = time + localOffset;
    const LA = utc + (3600000*-8)
    const nd = new Date(LA);
    console.log("LA time now: "+nd.toLocaleTimeString());
    return nd.toLocaleTimeString();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const currTime = getLocalTime();
    // send POST request to the backend
    axios.post('/dininghall/addReview', {
      hallName: userInput.dininghall,
      review: userInput.review,
      currTime: currTime,
      rating: userInput.rating,
      username: props.currUser
    })
    .then(response => {
      console.log(response)
      
      if (response.data === "dining hall not found") {
        console.log("Invalid dining hall");
        setErrorMsg("Invalid dining hall");
      }
      else if (response.data === "user not checked in") {
        console.log("User not checked in");
        setErrorMsg("You must be checked in at a dining hall!");
      }
      else {
        console.log("Successful review submit");
        setErrorMsg("Submitted!");
      }
    })
    .catch(error => {
      console.log("Error: " + error)
    });

    setUserInput({dininghall: "", review: "", rating: 0});
  }

  return(
    
    <div className="reviewpage">
      <form onSubmit={e => handleSubmit(e)} >
        <h3>Dining Hall</h3>
        <select 
          placeholder = "choose dining hall"
          onChange={e => setUserInput({...userInput, dininghall: e.target.value})}
          required
        >
          <option value="De Neve" selected>De Neve</option>
          <option value="BPlate">Bruin Plate</option>
          <option value="Epicuria">Epicuria</option>
          <option value="The Study">The Study</option>
          <option value="Bruin Cafe">Bruin Cafe</option>
          <option value="Rendezvous West">Rendezvous West</option>
          <option value="Rendezvous East">Rendezvous East</option>
        </select>

        {/* Changed this to be a drop-down instead of text*/}
        <h3>Rating</h3>
        <select
          value={userInput.rating}
          onChange={e => setUserInput({...userInput, rating: e.target.value})}
          required
        >
          <option value="1" selected>1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        
        <h3>Review</h3>
        <textarea
          onChange={e => setUserInput({...userInput, review: e.target.value})}
          className="reviewbox"
          placeholder="Enter your review here"
        />
        {errorMsg}
        <input type='submit'/>
      </form>
    </div>
  );
}

// for protected pages
function ReviewPage(props) {
  return props.currUser ? <Review currUser={props.currUser}/> : <Navigate to="/login"/>;
}

export default ReviewPage