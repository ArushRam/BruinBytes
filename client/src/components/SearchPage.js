import React, {useState, useEffect} from 'react';
import '../css/DiningHallInfo.css'
var axios = require('axios');

function searchCard(props) {
    return(
        <div>
            <h2>{props.hall.name}</h2>
            <p>Rating: {Number.parseFloat(props.hall.rating).toFixed(1)}/5</p>
            <p>At {Math.round(props.hall.population/props.hall.capacity * 100)} capacity</p>
        </div>
    )
}

function searchList(props) {
    console.log("yo!");
    const filtered = props.filteredHalls.map(hall => <searchCard key={hall._id} hall={hall}/>)
    console.log(props.filteredHalls)
    return (
        <div>
            {filtered}
        </div>
    )
}

function Search(props) {
    const [searchDish, setSearchDish] = useState("");
    const [halls, setHalls] = useState([]);
    const [message, setMessage] = useState("");

    const handleChange = e => {
        setSearchDish(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();

        axios.post('http://localhost:5000/dishes/getHalls', {dishName: searchDish})
        .then(res => {
            if (res.data.length == 0) {
                setMessage("No halls are serving this dish")
            } 
            else {
                setHalls(res.data);
                setMessage("Available at:")
            }
        })
        .catch(error => {
            console.log("Error: " + error)
        })

        setSearchDish("");
    };

    return (
        <div>
            <div>
                <h2>Search for a dish!</h2>
                <form onSubmit={e => handleSubmit(e)}>
                    <label htmlFor="header-search">
                        <span className="visually-hidden"></span>
                    </label>
                    <input
                        type = "text"
                        id = "header-search"
                        placeholder = "Enter dish name"
                        onChange = {e => handleChange(e)}
                    />
                    <button type='submit'>Search</button>
                </form>
            </div>
            <div>
                <div>
                    <br/>
                    <h4>{message}</h4>
                </div>
                <br/>
                <div>
                    {halls.map(hall => {
                        return(
                            <div>
                                <h4>{hall.name}</h4>
                                <p>Rating: {Number.parseFloat(hall.rating).toFixed(1)}/5.0</p>
                                <p>At {Math.round(hall.population/hall.capacity * 100)}% capacity</p>
                                <br/>
                            </div>
                        )}
                    )}
                </div>
            </div>
        </div>
    );
}

export default Search;