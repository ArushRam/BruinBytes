import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import '../css/LoginPage.css'
var axios = require('axios');

function LoginPage(props) {
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
      console.log(response)
      if (response.data === "username error") {
        setErrMsg("User does not exist");
      }
      else if (response.data === "password error") {
        setErrMsg("Incorrect password");
      }
      else if (response.statusText === "OK") {
        setErrMsg("");
        props.setUser(response.data);
        console.log("Logged in successfully")
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
      <Link to="/signup">No account? Sign up here.</Link>
    </div>
  );
}



export default LoginPage;
