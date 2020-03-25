import axios from "axios";
import { UserInstance } from "twilio/lib/rest/chat/v1/service/user";

export default {
  getContacts: function (data) {
    console.log(`data: ${JSON.stringify(data)}`);
    return axios.get("/api/contacts/" + data.userId);
  },
  updateContact: function (contactData) {
    return axios.post("/api/contact/" + contactData.userEmail, contactData);
  },
  removeContact: function (contactData) {
    return axios.post("/api/removecontact/" + contactData.userEmail, contactData);
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
  deleteRecipe: function (recipeData) {
    return axios.delete("/api/recipes/" + recipeData.id + '/' + recipeData.email);
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
  deleteDrink: function (drinkData) {
    return axios.delete("/api/drinks/" + drinkData.id + '/' + drinkData.email);
  },
  updateDrink: function (drinkData) {
    return axios.put("/api/drinks/" + drinkData.id, drinkData);
  },
  saveLiquor: function(drinkData) {
    return axios.post("/api/liquor", drinkData);
  },
  getLiquors: function() {
    return axios.get("/api/liquor");
  },
  deleteLiquor: function(drinkData) {
    return axios.delete("/api/liquor/" + drinkData.id + '/' + drinkData.email);
  },

  //Pantry Routes
  getIngredients: function () {
    return axios.get("/api/pantry");
  },
  deleteIngredient: function (pantryData) {
    return axios.delete("/api/pantry/" + pantryData.id + "/" + pantryData.email);
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
