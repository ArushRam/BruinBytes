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
    var halls = []
    axios.post('http://localhost:5000/dishes/getHalls', {name: searchDish})
        .then(res => {halls = res.data; console.log(res.data)});

    //const dish = axios.get('http://localhost:5000/dishes/getDishInfo', {dishName: searchDish});

    const resultList = () => {
        return(
            <searchList filteredHalls={halls}/>
        )
    };

   const handleChange = e => {
        setSearchDish(e.target.value);
        //const halls = axios.get('http://localhost:5000/dishes/getHalls', {dishName: searchDish});

    };

    /*
    const handleSubmit = e => {
        e.preventDefault();

    }*/

    return (
        <div>
            <div>
                <h2> Search for a dish!</h2>
                <input
                    type = "search"
                    placeholder = "dish name"
                    onChange = {handleChange}
                />
            </div>
            <div>
                {resultList()}
            </div>
        </div>
    );
}

export default Search;