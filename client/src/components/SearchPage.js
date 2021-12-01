import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../css/SearchPage.css'
var axios = require('axios');

function Search(props) {
    const [searchString, setSearchString] = useState("");
    const [results, setResults] = useState([]);
    const [message, setMessage] = useState("");

    const handleChange = e => {
        setSearchString(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (searchString == "") return;

        axios.post('http://localhost:5000/dishes/getDishes', {dishName: searchString})
        .then(dishes => {
            if (dishes.data.length == 0) {
                setMessage(searchString + " is not being served today")
            }
            else {
                setResults(dishes.data);
                console.log(dishes.data);
                setMessage("");
            }
        })
        .catch(err => console.log(err))

        setSearchString("");
    };

    return (
        <div>
            <div className="searchpage">
                <h2>Search for a dish!</h2>
                <form onSubmit={e => handleSubmit(e)}>
                    <input
                        type = "text"
                        id = "header-search"
                        className = "searchBox"
                        placeholder = "Enter dish name."
                        onChange = {e => handleChange(e)}
                    />
                    <button type='submit' class='searchButton'>Search</button>
                </form>
            </div>
            <div>
                <br/><h4>{message}</h4>
                <br/>
                <div>
                    {results.length != 0 &&
                            results.map(dish => {
                                return(
                                    <div><button className="hallCard">
                                        <h3>{dish.name}</h3>
                                        <p><b>Available at: {dish.hall}</b></p>
                                        <p><b>Calories:</b> {dish.calories} kCal</p>
                                        <p>
                                            <b>Info: </b>
                                            {dish.tags.map((tag, index) => {
                                                return(
                                                    <span><i>
                                                        {tag}
                                                        {index != dish.tags.length - 1 && <span>, </span>}
                                                    </i></span>
                                                )
                                            })}
                                        </p>
                                    </button></div>
                                )
                            })
                        }
                </div>
            </div>
        </div>
    );
}

export default Search;