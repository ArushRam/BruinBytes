const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dishSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    halls: [{type: Schema.Types.ObjectID, ref: 'DiningHall'}],
    calories: {type: Number, immutable: true},
    tags: {type: [String], immutable: true}
});

const Dish = mongoose.model('Dish', dishSchema);
module.exports = Dish;