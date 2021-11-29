const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const diningHallSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 3
    },
    capacity: {
        type: Number,
        required: true,
        min: 10
    },
    rating: Number,
    population: {
        type: Number,
        min: 0
    },
    numRatings: Number,
    reviews: [String],
    menu: [String]
});

const DiningHall = mongoose.model('DiningHall', diningHallSchema);
module.exports = DiningHall;