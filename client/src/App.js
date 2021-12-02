import './App.css';
import React, {useState, useEffect } from 'react';
import { Outlet, Route, Routes, Navigate } from "react-router-dom";
import MenuBar from './components/MenuBar.js'; 
import LoginPage from './components/LoginPage'
import DiningHallContainer from './components/DiningHallContainer';
import DiningHallInfo from './components/DiningHallInfo';
import ReviewPage from './components/ReviewPage';
import SignupPage from './components/SignupPage';
import SearchPage from './components/SearchPage';
import ProfilePage from './components/ProfilePage';

function PublicRoute(props) {
  // If NOT authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return !props.currUser ? <Outlet /> : <Navigate to="/home" />
}


function PrivateRoute(props) {
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return props.currUser ? <Outlet /> : <Navigate to="/login" />;
}


function Home(props) {
  return (
    <div className="App">
      <MenuBar currUser={props.currUser} setUser={props.setUser}/>
      <Outlet />
    </div>
  );
}



function App() {
  const [userData, setUserData] = useState(null);  // contains data on logged in user
  
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home currUser={userData} setUser={setUserData} />}>
          <Route path='/home' element={<DiningHallContainer currUser={userData} /> } />
          <Route path='/login' element={<PublicRoute currUser={userData} />} >
            <Route path='/login' element={<LoginPage currUser={userData} setUser={setUserData} />} />  
          </Route>    
          <Route path='/signup' element={<PublicRoute currUser={userData} />} >
            <Route path='/signup' element={<SignupPage currUser={userData} setUser={setUserData}/>} />  
          </Route>    
          <Route path='/review' element={<PrivateRoute currUser={userData}/>} >
            <Route path='/review' element={<ReviewPage currUser={userData}/>} />
          </Route>
          <Route path='/dininghall/:dininghall' element={<DiningHallInfo currUser={userData}/>} />
          <Route path='/search' element={<SearchPage currUser={userData}/>} />
          <Route path='/profile' element={<ProfilePage currUser={userData}/>} />
          <Route index element={<DiningHallContainer currUser={userData}/>}/>

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
