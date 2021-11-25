import React, {useState} from 'react';
import './ReviewPage.css';


function ReviewPage(props) {
  // object containing parts of the user review
  const [userInput, setUserInput] = useState(
    {
      dininghall: "deneve",
      review: "Type your review here",
      rating: "1.5"
    }
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    // submit POST to middleware here
    console.log(userInput)
    console.log("Submitted!");
  }

  return(
    <div className="reviewpage">
      <form onSubmit={e => handleSubmit(e)} >
        <h3>Dining Hall</h3>
        <select 
          value={userInput.dininghall} 
          onChange={e => setUserInput({...userInput, dininghall: e.target.value})}
        >
          <option value="deneve">De Neve</option>
          <option value="bplate">BPlate</option>
          <option value="epicuria">Epicuria</option>
        </select>

        <h3>Rating</h3>
        <input 
          type="text"
          value={userInput.rating}
          onChange={e => setUserInput({...userInput, rating: e.target.value})}
        />

        <h3>Review</h3>
        <textarea
          value={userInput.review}
          onChange={e => setUserInput({...userInput, review: e.target.value})}
          className="reviewbox"
        />
        <input type='submit'/>
      </form>
    </div>
  );
}

export default ReviewPage