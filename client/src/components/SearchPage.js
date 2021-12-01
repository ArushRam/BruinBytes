import React, {useState, useEffect} from 'react';
import '../css/SearchPage.css'
var axios = require('axios');

function Search(props) {
    const [searchDish, setSearchDish] = useState("");
    const [halls, setHalls] = useState([]);
    const [dish, setDish] = useState({
        name: "",
        calories: "",
        tags: []
    });
    const [messages, setMessages] = useState(["",""]);

    const handleChange = e => {
        setSearchDish(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();

        axios.post('http://localhost:5000/dishes/getDishInfo', {dishName: searchDish})
        .then(dishRes => {
            console.log(dishRes);
            if (dishRes.data == "no such dish") {setMessages("This dish is not available", "")}
            else {
                axios.post('http://localhost:5000/dishes/getHalls', {dishName: searchDish})
                .then(hallRes => {
                    setHalls(hallRes.data);
                    setDish({name: dishRes.data.name, calories: dishRes.data.calories, tags: dishRes.data.tags});
                    setMessages(["", "Available at:"]);
                })
                .catch(error => {
                    console.log(error);
                })
            }
        }).catch(error => {
            console.log(error)
        })

        setSearchDish("");
    };

    return (
        <div>
            <div className="searchpage">
                <h2>Search for a dish!</h2>
                <form onSubmit={e => handleSubmit(e)}>
                    <label htmlFor="header-search">
                        <span className="visually-hidden"></span>
                    </label>
                    <input
                        type = "text"
                        id = "header-search"
                        placeholder = "Enter dish name."
                        onChange = {e => handleChange(e)}
                    />
                    <button type="submit" className="searchButton">Search</button>
                </form>
            </div>
            <div>
                <div>
                    <br/>
                    <h4>{messages[0]}</h4>
                </div>
                <br/>
                    {dish.name != "" &&
                    <div>
                        <h4>{dish.name}</h4>
                        <p><b>Calories:</b> {dish.calories} kCal</p>
                        <b>Contains: </b>
                        {dish.tags.map((tag, index) => {
                            return(
                                <span><i>
                                    {tag}
                                    {index != dish.tags.length - 1 && <span>, </span>}
                                </i></span>
                            )
                        })}
                    </div>
                    }
                <br />
                <div>
                    <br/>
                    <h4>{messages[1]}</h4>
                </div>
                <div>
                    {halls.map(hall => {
                        return(
                            <div><button className='hallCard'>
                                <h4>{hall.name}</h4>
                                <p>Rating: {Number.parseFloat(hall.rating).toFixed(1)}/5.0</p>
                                <p>At {Math.round(hall.population/hall.capacity * 100)}% capacity</p>
                            </button></div>
                        )}
                    )}
                </div>
            </div>
        </div>
    );
}

export default Search;