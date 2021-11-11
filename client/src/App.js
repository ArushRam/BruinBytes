import './App.css';
import React, {useState} from 'react';
import { Outlet, Link } from "react-router-dom";
import MenuBar from './components/MenuBar.js'; 



function App() {

  return (
    <div className="App">
      <MenuBar />
      <Outlet />
    </div>
  );
}

export default App;
