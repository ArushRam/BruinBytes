import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import '../css/MenuBar.css';


function Logout(logoutFunc) {
  logoutFunc(null);
}


function MenuBar(props) {
  let reviewLink;
  if (props.currUser){
    reviewLink = 
    <Link to={{pathname: "/review", state: { currUser: props.currUser } }}
    >Write a Review</Link>
  } else {
    reviewLink = 
    <Link to={{pathname: "/login", state: { currUser: props.currUser } }}
    >Write a Review</Link>
  }
  return (
    <div className="menubar">
      <h2> Menu Bar </h2>
      <nav>
        <ul>
          <Link to="/home">Home</Link> |{" "}
          {!props.currUser &&  // if user is logged in, no need to login/signup
            <Link to="/login">Login</Link> 
          } |{" "}
          {!props.currUser && 
            <Link to="/signup">Sign up</Link>
          } | {" "}
          {props.currUser && 
            <Link to="/home" onClick={Logout(props.setUser)}>Logout</Link>
          } | {" "}
          {reviewLink}
        </ul>
      </nav>
    </div>
  );
}

export default MenuBar; 