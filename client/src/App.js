import './App.css';
import React, {useState} from 'react';
import { Outlet, Route, Routes, Navigate } from "react-router-dom";
import MenuBar from './components/MenuBar.js'; 
import LoginPage from './components/LoginPage'
import DiningHallContainer from './components/DiningHallContainer';
import DiningHallInfo from './components/DiningHallInfo';
import ReviewPage from './components/ReviewPage';
import SignupPage from './components/SignupPage';


function Home(props) {
  return (
    <div className="App">
      <MenuBar currUser={props.currUser}/>
      <Outlet />
    </div>
  );
}



function App() {
  const [userData, setUserData] = useState(null);  // contains data on logged in user
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home currUser={userData}/>}>
          <Route path='/home' element={<DiningHallContainer />} />
          <Route path='/login' element={<LoginPage />} />         
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/review' element={<ReviewPage currUser={userData}/>} />
          <Route path='/dininghall/:dininghall' element={<DiningHallInfo />} />
          <Route index element={<DiningHallContainer />}/>
          <Route /* for undefined routes */
            path="*"
            element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
