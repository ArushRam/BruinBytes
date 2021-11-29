import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../css/MenuBar.css';



function MenuBar(props) {
  let reviewLink;
  let currUserName;
  if (props.currUser){
    reviewLink = 
    <Link to={{pathname: "/review", state: { currUser: props.currUser } }}
    >Write a Review</Link>;

    currUserName = <h2>Welcome {props.currUser}!</h2>;
  } else {
    reviewLink = 
    <Link to={{pathname: "/login", state: { currUser: props.currUser } }}
    >Write a Review</Link>;

    currUserName = <h2></h2>;
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
          {/* //React HATES this onClick function, fix later
          {props.currUser && 
            <Link to="/home" onClick={props.setUser(null)}>Logout</Link>
          } 
        */}
          {reviewLink}
          {currUserName}
        </ul>
      </nav>
    </div>
  );
}



export default MenuBar; 