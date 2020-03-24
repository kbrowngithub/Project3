import axios from "axios";
import { UserInstance } from "twilio/lib/rest/chat/v1/service/user";

export default {
  updateContact: function (contactData) {
    return axios.post("/api/contact/" + contactData.userEmail, contactData);
  },

  //Recipe Routes
  getRecipes: function () {
    return axios.get("/api/recipes");
  },
  getRecipe: function (id) {
    return axios.get("/api/recipes/" + id);
  },
  saveRecipe: function (recipeData) {
    return axios.post("/api/recipes", recipeData);
  },
  deleteRecipe: function (id) {
    return axios.delete("/api/recipes/" + id);
  },
  updateRecipe: function(recipeData) {
    return axios.put("/api/recipes/" + recipeData.id, recipeData)
  },

  //Drink Routes
  saveDrink: function (drinkData) {
    return axios.post("/api/drinks", drinkData);
  },
  loadDrinks: function() {
    return axios.get("/api/drinks");
  },
  loadDrink: function(id) {
    return axios.get("/api/drinks/" + id);
  },

  //Pantry Routes
  getIngredients: function () {
    return axios.get("/api/pantry");
  },
  deleteIngredient: function (id) {
    return axios.delete("/api/pantry/" + id);
  },
  saveIngredient: function (pantryData) {
    return axios.post("/api/pantry", pantryData);
  },
  updateIngredient: function (pantryData) {
    return axios.put("/api/pantry/" + pantryData.id, pantryData);
  },

  //User Routes
  newUser: function (userData) {
    return axios.post("/api/users", userData);
  },
  login: function (userData) {
    return axios.post("/api/login", userData);
  },
  logout: function () {
    return axios.get("/logout");
  },

  //External API Routes
  searchRecipes: function (query) {
    return axios.post("/api/spoon", query);
  },
  searchSumms: function (id) {
    return axios.post("/api/spoonSumm/" + id);
  },
  getInstructions: function (id) {
    return axios.post("/api/spoonOne/" + id);
  },
  searchDrinks: function (query) {
    return axios.post("/api/drink", query);
  },
  searchDrinkDetails: function (id) {
    return axios.post("/api/drinkDetail/" + id);
  }
};
