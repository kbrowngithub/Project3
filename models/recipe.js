const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: { type: String, required: true },
    image: { type: String, default: "https://ezyvectors.com/wp-content/uploads//edd/2019/05/Colorful-Free-Food-Icon-Vector.jpg" },
    idAPI: { type: Number },
    ingredients: { type: Array, required: true },
    instructions: { type: Array },
    date: { type: Date, default: Date.now }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;