const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: { 
        type: String, 
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 60
    },
    image: { 
        type: String, 
        default: "https://ezyvectors.com/wp-content/uploads//edd/2019/05/Colorful-Free-Food-Icon-Vector.jpg",
        trim: true,
        maxlength: 150
    },
    idAPI: { 
        type: Number 
    },
    summary: {
        type: String
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

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;