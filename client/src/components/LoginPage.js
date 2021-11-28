import React, {useState} from 'react';
import '../css/LoginPage.css'

function LoginPage() {

  const [userInput, setUserInput] = useState(
    {
      username: "",
      password: ""
    }
  )

  const handleSubmit = (e) => {
    e.preventDefault();
    // submit POST to middleware here
    console.log(userInput)
    console.log("Submitted!");
  }

  return (
    <div className="loginpage">
      <h1>Log in</h1>
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