import './App.css';
import React, {useState} from 'react';
import { Outlet, Link } from "react-router-dom";
import MenuBar from './components/MenuBar.js'; 



function App() {
  const [userData, setUserData] = useState(null);  // contains data on logged in user


  return (
    <div className="App">
      <MenuBar currUser={userData}/>
      <Outlet />
    </div>
  );
}

export default App;
