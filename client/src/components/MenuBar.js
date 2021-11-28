import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import '../css/MenuBar.css';

function MenuBar(props) {
  return (
    <div className="menubar">
      <h2>Menu Bar</h2>
      <nav>
        <ul>
          <Link to="/home">Home</Link> |{" "}
          <Link to="/login">Login</Link>|{" "}
          <Link to="/review">Write a Review</Link>
        </ul>
      </nav>
    </div>
  );
}

export default MenuBar; 