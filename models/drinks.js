const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DrinkSchema = new Schema({
    title: { 
        type: String, 
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 60
    },
    image: { 
        type: String, 
        default: "https://ezyvectors.com/wp-content/uploads/edd/2019/02/free-mocktail-vector-free.png",
        trim: true,
        maxlength: 150
    },
    idDrink: { 
        type: Number 
    },
    ingredients: { 
        type: Array, 
        required: true
    },
    instructions: { 
        type: Array
    },
    date: { type: Date, default: Date.now }
});

const Drink = mongoose.model("Drink", DrinkSchema);

module.exports = Drink;