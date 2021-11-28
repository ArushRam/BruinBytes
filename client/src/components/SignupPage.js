import React, {useState} from 'react';
import '../css/SignupPage.css'
const axios = require('axios').default;

function SignupPage() {

  const [userInput, setUserInput] = useState(
    {
      username: "",
      password: ""
    }
  )

  const handleSubmit = (e) => {
    e.preventDefault();
    // submit POST to middleware here
    axios.post('/users/addUser', {
      username: userInput.username,
      password: userInput.password
    })
    .then(function (response) {
      console.log(response)
      if (response.data === false) {
        // What happens if user exists?
        console.log(response)
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div className="signuppage">
      <h1>Sign up</h1>
      <form onSubmit={e => handleSubmit(e)} >
        <h2>Username: </h2>
        <input 
            type="text"
            value={userInput.username}
            onChange={e => setUserInput({...userInput, username: e.target.value})}
            required
        />
        <h2>Password: </h2>
        <input 
            type='password' 
            name='password'
            value={userInput.password}
            onChange={e => setUserInput({...userInput, password: e.target.value})}
            required
        />

        <button type="submit" class="signupButton">Sign up</button>
    </form>
    </div>
  );
}



export default SignupPage;