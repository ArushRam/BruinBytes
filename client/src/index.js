import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import LoginPage from './components/LoginPage'
import DiningHallContainer from './components/DiningHallContainer';
import reportWebVitals from './reportWebVitals';
import DiningHallInfo from './components/DiningHallInfo';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='/home' element={<DiningHallContainer />} />
          <Route path='login' element={<LoginPage />} />
          <Route path=':dininghall' element={<DiningHallInfo />} />
          <Route index element={<DiningHallContainer />}/>
          <Route
            path="*"
            element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
