var db = require("../models")
var passport = require("../config/passport");
const usersController = require("../controllers/usersController");
const smsController = require("../controllers/smsController");
const pantryController = require("../controllers/pantryController");
const recipesController = require("../controllers/recipesController");
const axios = require("axios");

function api_routes(app) {
    app.get("/", function (req, res) {
        res.send("Hello World");
    })

    // app.get("/friends", function (req, res) {
    //     res.sendFile(path.join(__dirname, 'build', 'index.html'));
    // })

    app.get("/api/users", function (req, res) {
        db.User.find({}).then(function (data) {
            res.json(data)
        })
    })

    app.post("/api/users", usersController.create);

    app.post('/api/login', (req, res, next) => {
        console.log("Login Request Recieved")
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login'
        })(req, res, next);
      });

    // Logout
    app.get('/logout', (req, res) => {
        console.log("Logout")
        res.send("Logout!");
        req.logout();
    });

    app.get("/api/users", function (req, res) {
        db.User.find({}).then(function (data) {
            res.json(data)
        })
    });

    app.post("/api/users", usersController.create);

    app.post("/api/messages", smsController.invite);

    app.get("/sms", function (req, res) {
        console.log(`Hit the localhost:1337/sms get route`);
        res.send("Hello SMS");
    });

    app.post('/api/sms', smsController.inviteResponse);

    app.post('/api/email', smsController.emailInvite);

    app.post('/api/pantry', pantryController.create);

    app.get('/api/recipes', recipesController.findAll);

    app.get('/api/recipes/:id', recipesController.findById);

    app.post('/api/recipes', recipesController.create);

    app.get('/api/pantry', pantryController.findAll);

    app.put('/api/pantry/:id', pantryController.update)

    app.delete('/api/pantry/:id', pantryController.remove);

    app.post('/api/spoon', function (req, res) {
        var queryURL = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" + process.env.foodAPIKey + "&ingredients=" + req.body.query + "&limitLicense=true&ranking=2&number=3&ignorePantry=true";
        axios.get(queryURL)
            .then(response => {
                recipes = response.data;
                newRecipes= [];
                recipes.map(recipe=> {
                    var querySumm = "https://api.spoonacular.com/recipes/" + recipe.id + "/summary?apiKey=" + process.env.foodAPIKey;
                    axios.get(querySumm)
                        .then(response2 => {
                            recipe.summary = response2.data.summary;
                            newRecipes.push(recipe);
                            if (newRecipes.length === recipes.length) {
                                res.json(newRecipes);
                            }
                        })
                        .catch(err => console.log(err));
                })
            })
            .catch(err => {
                res.json(err);
            });
    });

    app.post("/api/spoonOne/:id", function (req, res) {
        var queryURL = "https://api.spoonacular.com/recipes/" + req.params.id + "/analyzedInstructions?apiKey=" + process.env.foodAPIKey;
        axios.get(queryURL)
            .then(response => {
                res.json(response.data);
            })
            .catch(err => console.log(err));
    });

    app.post("/api/drink", function (req, res) {
        var queryURL = "https://www.thecocktaildb.com/api/json/v1/" + process.env.drinkAPIKey + "/filter.php?i=" + req.body.query;
        axios.get(queryURL)
            .then(response => {
                res.json(response.data);
            })
            .catch(err => console.log(err));
    })
}

module.exports = api_routes;