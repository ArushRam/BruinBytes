import React, {useState} from 'react';
import { Navigate } from 'react-router';
import '../css/ReviewPage.css';
var axios = require('axios');


function Review(props) {
  // object containing parts of the user review
  const [userInput, setUserInput] = useState(
    {
      dininghall: "deneve",
      review: "",
      rating: ""
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // send POST request to the backend
    // placeholder route since backend section isn't implemented yet
    axios.post('users/reviewSubmit', {
      username: userInput.dininghall,
      password: userInput.review,
      rating: userInput.rating
    })
    .then(response => {
      console.log(response)
      if (response.data === "success") {
        console.log("Successful review submit")
      }
      else if (response.data === "error") {
        console.log("Error in review submit")
      }
    })
    .catch(error => {
      console.log("Error: " + error)
    });

    setUserInput({dininghall: "", review: "", rating: 0})
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
          <option value="deneve">De Neve</option>
          <option value="bplate">Bruin Plate</option>
          <option value="epicuria">Epicuria</option>
          <option value="thestudy">The Study</option>
          <option value="bcafe">Bruin Cafe</option>
          <option value="rendewest">Rendezvous West</option>
          <option value="rendeeast">Rendezvous East</option>
        </select>

        {/* Changed this to be a drop-down instead of text*/}
        <h3>Rating</h3>
        <select
          value={userInput.rating}
          onChange={e => setUserInput({...userInput, rating: e.target.value})}
          required
        >
          <option value="1">1</option>
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