import axios from "axios";

export default {
  // Gets all saved recipes
  getRecipes: function() {
    return axios.get("/api/recipes");
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
  searchRecipes: function(query) {
<<<<<<< HEAD
    const AppID = "7e12516e";
    const AppKey = "43686ac14fed6aac00402ab6b447842f";
    query = "bbq";
    // https://api.edamam.com/search?q=bbq&app_id=7e12516e&app_key=43686ac14fed6aac00402ab6b447842f
    console.log(axios.get(`https://api.edamam.com/search?q=${query}&app_id=${AppID}&app_key=${AppKey}`));
  },
  invite: function(smsData) {
    return axios.post("/api/recipes/", smsData);
=======
    var queryURL = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" + process.env.foodAPIKey + "&ingredients=chicken,+parmesan,+mushrooms,+anchovies&number=2&ignorePantry=true"
    axios.get(queryURL)
      .then(res=> console.log(res.data))
      .catch(err=> console.log(err));
>>>>>>> 9133ec2011603e297f3b80a8406e56de335a8da2
  }
};
