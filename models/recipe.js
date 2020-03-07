const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// "recipe": {
//     "uri": "http://www.edamam.com/ontologies/edamam.owl#recipe_05d4e730052a9dfcb90937d66e0750d4",
//     "label": "Backyard Barbecued Chicken with Homemade BBQ Sauce recipes",
//     "image": "https://www.edamam.com/web-img/82c/82cf12b3abb4e90daedc709f8b15f7df",
//     "source": "Martha Stewart",
//     "url": "http://www.marthastewart.com/318227/backyard-barbecued-chicken-with-homemade",
//     "shareAs": "http://www.edamam.com/recipe/backyard-barbecued-chicken-with-homemade-bbq-sauce-recipes-05d4e730052a9dfcb90937d66e0750d4/bbq",
//     "yield": 8,
//     "ingredientLines": [
//         "8 whole chicken leg quarters",
//         "ground black pepper",
//         "salt",
//         "2 cups Homemade BBQ Sauce"
//     ]
// }

//NOTE: THIS IS NOT CONSISTENT WITH SPOONACULAR AND WILL NEED TO BE OVERHAULED
const recipeSchema = new Schema({
    label: { type: String, required: true },
    image: { type: String, default: "https://ezyvectors.com/wp-content/uploads//edd/2019/05/Colorful-Free-Food-Icon-Vector.jpg" },
    source: { type: String, required: true },
    url: { type: String, required: true },
    ingredientLines: {type: Array, required: true},
    date: { type: Date, default: Date.now }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;