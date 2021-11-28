import React, {useState} from 'react';
import '../css/ReviewPage.css';


function ReviewPage(props) {
  // object containing parts of the user review
  const [userInput, setUserInput] = useState(
    {
      dininghall: "",
      review: "",
      rating: 0
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
        >
          <option value="deneve">De Neve</option>
          <option value="bplate">BPlate</option>
          <option value="epicuria">Epicuria</option>
        </select>

        <h3>Rating</h3>
        <input 
          type="text"
          placeholder = "rate from 0 to 5"
          onChange={e => setUserInput({...userInput, rating: e.target.value})}
        />

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