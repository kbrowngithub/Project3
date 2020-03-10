import axios from "axios";

export default {
  // Gets all saved recipes
  getRecipes: function() {
    return axios.get("/api/recipes");
  },
  getIngredients: function() {
    return axios.get("/api/pantry");
  },
  // Gets the recipe with the given id
  getRecipe: function(id) {
    return axios.get("/api/recipes/" + id);
  },
  // Deletes the recipe with the given id
  deleteRecipe: function(id) {
    return axios.delete("/api/recipes/" + id);
  },
  // Saves a recipe to the database
  saveRecipe: function(recipeData) {
    return axios.post("/api/recipes", recipeData);
  },
  saveIngredient: function(pantryData) {
    return axios.post("/api/pantry", pantryData);
  },
  searchRecipes: function(query) {
    console.log(query);
  //   var queryURL = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" + process.env.foodAPIKey + "&ingredients=" + query + "&number=2&ignorePantry=true"
  //   axios.get(queryURL)
  //     .then(res=> console.log(res.data))
  //     .catch(err=> console.log(err));
  }
};
