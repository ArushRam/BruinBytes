import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../css/MenuBar.css';



function MenuBar(props) {
  let reviewLink;
  let currUserName;
  const [value, setValue] = useState(0); // integer state
  const useForceUpdate = () => {
    setValue(value => value + 1); // update the state to force render
  }
  useEffect(() => {
    props.setUser(null);  // forces value to change, allowing to setUser
  }, [value]);
  
  if (props.currUser){
    reviewLink = 
    <Link to={{pathname: "/review", state: { currUser: props.currUser } }}
    >Write a Review</Link>;

    currUserName = <h3>Welcome {props.currUser}!</h3>;
  } else {
    reviewLink = 
    <Link to={{pathname: "/login", state: { currUser: props.currUser } }}
    >Write a Review</Link>;

    currUserName = <p></p>;
  }
  return (
    <div className="menubar">
      <h2 className="title"> Menu Bar </h2>
      <nav>
        <ul>
          <Link to="/home">Home</Link> |{" "}
          {!props.currUser &&  // if user is logged in, no need to login/signup
            <Link to="/login">Login</Link> 
          } |{" "}
          {!props.currUser && 
            <Link to="/signup">Sign up</Link>
          } | {" "}
          {reviewLink} | {" "}
          {props.currUser && 
            <button className="linkLookalike" onClick={useForceUpdate}>Logout</button>
          } 
        </ul>
      </nav>
      <div className="welcome">{currUserName}</div>
    </div>
  );
}



export default MenuBar; 