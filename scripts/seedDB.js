const mongoose = require("mongoose");
const db = require("../models");

// This file empties the REcipes collection and inserts the recipes below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/recipedb"
);

// label: { type: String, required: true },
// image: { type: String, default: "https://ezyvectors.com/wp-content/uploads//edd/2019/05/Colorful-Free-Food-Icon-Vector.jpg" },
// source: { type: String, required: true },
// url: { type: String, required: true },
// ingredientLines: {type: Array, required: true},
// date: { type: Date, default: Date.now }
const recipeSeed = [
  {
    label: "Backyard Barbecued Chicken with Homemade BBQ Sauce recipes",
    image: "https://www.edamam.com/web-img/82c/82cf12b3abb4e90daedc709f8b15f7df",
    source: "Martha Stewart",
    url: "http://www.edamam.com/recipe/backyard-barbecued-chicken-with-homemade-bbq-sauce-recipes-05d4e730052a9dfcb90937d66e0750d4/bbq",
    ingredientLines: [
      "8 whole chicken leg quarters",
      "ground black pepper",
      "salt",
      "2 cups Homemade BBQ Sauce"
      ],
    date: { type: Date, default: Date.now }
  },
  {
    label: "Oven Roasted Bbq Chicken Thighs",
    image: "https://www.edamam.com/web-img/803/8035a1729b7d706f2731611af2a5ec5f.jpg",
    source: "Pioneer Woman",
    url: "http://www.edamam.com/recipe/oven-roasted-bbq-chicken-thighs-deb32477acd2ad8c18e6a74df29fd153/bbq",
    ingredientLines: [
      "3 cups Your Favorite BBQ Sauce",
      "1/2 cup Peach Preserves",
      "1 clove Garlic",
      "Hot Sauce, Optional",
      "12 whole Chicken Thighs, Bone-in, Skin-on",
      "Olive Oil For Brushing"
      ],
    date: { type: Date, default: Date.now }
  }
];

db.Recipe
  .remove({})
  .then(() => db.Recipe.collection.insertMany(recipeSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

