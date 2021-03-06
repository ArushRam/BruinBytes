import React, {useState, useEffect} from 'react';
import { Navigate } from 'react-router';
// add better CSS styling for this page later
import '../css/ProfilePage.css'
var axios = require('axios');

function Profile (props) {
    const [favFood, setFavFood] = useState("");
    const [userInput, setUserInput] = useState();
    const [errorMsg, setErrorMsg] = useState("");

    // GET info about current user
    axios.get("/users/" + props.currUser)
    .then(response => {
        console.log(response.data.favoriteDish); // for some reason this prints like seven times
        // get favFood
        setFavFood(response.data.favoriteDish)
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log("userInput is " + userInput)
        if (typeof userInput === 'undefined') {
            return;
        }

        await axios.post('/users/editFavFood', {
            username: props.currUser,
            favFood: userInput.favFood
        })
        .then(response => {
            console.log(response)

            if (response.data === "user not found") {
                console.log("User not found")
                setErrorMsg("User not found");
            }
            else {
                console.log("Successfully set favorite food")
                setErrorMsg("");
            }

            // GET info about current user
            axios.get("/users/" + props.currUser)
            .then(response => {
                console.log(response.data.favoriteDish); // for some reason this prints like seven times
                // get favFood
                setFavFood(response.data.favoriteDish)
            })
        })
    }

    return (
        <div className = "favFoodDisplay">
            <h3>Your favorite food is {favFood}</h3>
            <br></br>
            <h4>{errorMsg}</h4>
            <br></br>
            <form onSubmit={e => handleSubmit(e)}>
                <h4>Set favorite food:</h4>
                <br></br>
                <input
                    type="text"
                    className="profilefont"
                    onChange={e => setUserInput({...userInput, favFood: e.target.value})}
                    placeholder="Set favorite food."
                />
                <input type='submit' class='profileButton'/>
            </form>
        </div>
    )
}

function ProfilePage (props) {
    return props.currUser ? <Profile currUser={props.currUser}/> : <Navigate to="/login"/>;
}

export default ProfilePage