import axios from "axios";

export default {
  // Gets all saved recipes
  getRecipes: function() {
    return axios.get("/api/recipes");
  },
  getIngredients: function() {
    console.log("API getIng");
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
    console.log("search API", query);
    var queryURL = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=cf937a5d671c42ee9344d0012d8505f7&ingredients=" + query + "&number=2&ignorePantry=true"
    return axios.get(queryURL)
      // .then(res=> console.log(res.data))
      // .catch(err=> console.log(err));
  }
};
