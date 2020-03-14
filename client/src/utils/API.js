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
  deleteIngredient: function(id) {
    return axios.delete("/api/pantry/" + id);
  },
  // Saves a recipe to the database
  saveRecipe: function(recipeData) {
    return axios.post("/api/recipes", recipeData);
  },
  saveIngredient: function(pantryData) {
    return axios.post("/api/pantry", pantryData);
  },
  updateIngredient: function(pantryData) {
    return axios.put("/api/pantry/" + pantryData.id, pantryData);
  },

  newUser: function(userData) {
    return axios.post("/api/users", userData);
  },

  login: function(userData) {
    return axios.post("/api/login", userData);
  },

  logout: function() {
    return axios.get("/logout");
  },
  
  searchRecipes: function(query) {
    return axios.post("/api/spoon", query);
  },

  getInstructions: function(id) {
    return axios.post("/api/spoonOne/" + id);
  },

  searchDrinks: function(query) {
    return axios.post("/api/drink", query);
  }
};
