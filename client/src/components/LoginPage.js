import React, {useState} from 'react';
import '../css/LoginPage.css'
var axios = require('axios');

function LoginPage() {

  const [userInput, setUserInput] = useState(
    {
      username: "",
      password: ""
    }
  )
  const [errMsg, setErrMsg] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post('/users/signin', {
      username: userInput.username,
      password: userInput.password
    })
    .then(response => {
      if (response.data == "success") {
        setErrMsg("");
      }
      else if (response.data == "username error") {
        setErrMsg("User does not exist");
      }
      else if (response.data == "password error") {
        setErrMsg("Incorrect password");
      }
    })
    .catch(error => {
      setErrMsg("An error occurred");
      console.log(error)
    });

    console.log(userInput)
    console.log("Submitted!");
  }

  return (
    <div className="loginpage">
      <h1>Log in</h1>
      <p>{errMsg}</p>
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

        <button type="submit" className="loginButton">Log in</button>
      </form>
    </div>
  );
}



export default LoginPage;