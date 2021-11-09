import './App.css';
import React, {useState} from 'react';
import MenuBar from './components/MenuBar.js'; 
import DiningHallContainer from './components/DiningHallContainer.js';


function App() {

  
  return (
    <div className="App">
      <MenuBar />
      <DiningHallContainer />
    </div>
  );
}

export default App;
