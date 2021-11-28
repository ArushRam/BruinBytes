import React, {useState} from 'react';
import './SignupPage.css'

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
    console.log(userInput)
    console.log("Signed up!");
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
      />
      <h2>Password: </h2>
      <input 
        type='password' 
        name='password'
        value={userInput.password}
        onChange={e => setUserInput({...userInput, password: e.target.value})}
      />

      <button type="submit" class="signupButton">Sign up</button>
    </form>
    </div>
  );
}



export default SignupPage;