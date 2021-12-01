import React, {useState, useEffect} from 'react';
import { Navigate } from 'react-router';
// add better CSS styling for this page later
import '../css/ProfilePage.css'
var axios = require('axios');

function Profile (props) {
    const [favFood, setFavFood] = useState("");
    
    // GET info about current user
    axios.get("/users/" + props.currUser)
    .then(response => {
        console.log(response); // for some reason this prints like seven times
        
        // get favFood
        setFavFood(response.data.favoriteDish)
    })
    /*
    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post('/users/editFavFood')
    }
    */
    return (
        <div className = "favFoodDisplay">
            <h3>Your favorite food is {favFood}</h3>
        </div>
    )
}

function ProfilePage (props) {
    return props.currUser ? <Profile currUser={props.currUser}/> : <Navigate to="/login"/>;
}

export default ProfilePage