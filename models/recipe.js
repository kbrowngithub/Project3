const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: { 
        type: String, 
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 30
    },
    image: { 
        type: String, 
        default: "https://ezyvectors.com/wp-content/uploads//edd/2019/05/Colorful-Free-Food-Icon-Vector.jpg",
        trim: true,
        minlength: 5,
        maxlength: 150
    },
    idAPI: { 
        type: Number 
    },
    ingredients: { 
        type: Array, 
        required: true,
        minlength: 5 
    },
    instructions: { 
        type: Array,
        minlength: 5 
    },
    date: { type: Date, default: Date.now }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;