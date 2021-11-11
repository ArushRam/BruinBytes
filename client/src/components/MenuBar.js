import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './MenuBar.css';

function MenuBar(props) {
  return (
    <div className="menubar">
      <h2>Menu Bar</h2>
      <nav>
        <ul>
          <Link to="/">Home</Link> |{" "}
          <Link to="/login">Login</Link>
        </ul>
      </nav>
    </div>
  );
}

export default MenuBar; 