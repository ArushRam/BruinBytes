const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        immutable: true,
        minlength: 5
    },
    password: {
        type: String,
        required: true,
        immutable: true,
        minlength: 5
    },
    isLoggedIn: Boolean,
    currentDiningHall: String,
    favoriteDish: String,
})