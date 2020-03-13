const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// {
//     "id": 1227795,
//     "title": "Chicken and Artichoke",
//     "image": "https://spoonacular.com/recipeImages/1227795-312x231.png",
//     "missedIngredients": [
//         {
//             "name": "artichokes",
//         }
//     ],
//     "usedIngredients": [
//         {
//             "name": "chicken"
//         },
//         {
//             "name": "parmesan cheese",
//         },
//         {
//             "name": "spiral pasta"
//         }
//     ]
// }

const recipeSchema = new Schema({
    title: { type: String, required: true },
    image: { type: String, default: "https://ezyvectors.com/wp-content/uploads//edd/2019/05/Colorful-Free-Food-Icon-Vector.jpg" },
    id: { type: Number, required: true },
    ingredients: {type: Array, required: true},
    missingIngredients: {type: Array},
    date: { type: Date, default: Date.now }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;