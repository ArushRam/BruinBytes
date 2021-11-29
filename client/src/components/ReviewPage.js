import React, {useState} from 'react';
import '../css/ReviewPage.css';
var axios = require('axios');


function ReviewPage(props) {
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
    // submit POST to middleware here
    console.log(userInput)
    console.log("Submitted!");
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

export default ReviewPage