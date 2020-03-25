var db = require("../models")
var passport = require("../config/passport");
const usersController = require("../controllers/usersController");
const smsController = require("../controllers/smsController");
const pantryController = require("../controllers/pantryController");
const recipesController = require("../controllers/recipesController");
const drinksController = require("../controllers/drinksController");
const liquorController = require("../controllers/liquorController");
const sessionsController = require("../controllers/sessionsController");
const axios = require("axios");

function api_routes(app) {
    //Init Route
    app.get("/", function (req, res) {
        res.send("Hello World");
    });

    //User Routes
    app.post("/api/users", usersController.create);

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

    app.post('/api/login', passport.authenticate('local'), 
        (req, res, next) => {
           res.send(req.user); 
        });
    

    // Get all sessions for a user
    app.get('/api/sessions', sessionsController.findAll);

    // Get a specific session for a user
    app.get('/api/sessions/:id', sessionsController.findBySession);

    app.get("/api/users", function (req, res) {
        db.User.find({}).then(function (data) {
            res.json(data)
        })
    })

    //Communication Routes
    app.post('/api/sms', smsController.inviteResponse);

    app.post('/api/email', smsController.emailInvite);

    app.post("/api/messages", smsController.invite);

    app.get("/sms", function (req, res) {
        console.log(`Hit the localhost:1337/sms get route`);
        res.send("Hello SMS");
    });

    //Recipe Routes
    app.get('/api/recipes', recipesController.findAll);

    app.get('/api/recipes/:id', recipesController.findById);

    app.put('/api/recipes/:id', recipesController.update);

    app.delete('/api/recipes/:id/:email', recipesController.remove);

    app.post('/api/recipes', recipesController.create);

    //Drink Routes
    app.get('/api/drinks', drinksController.findAll);

    app.get('/api/drinks/:id', drinksController.findById);

    app.put('/api/drinks/:id', drinksController.update);

    app.post('/api/drinks', drinksController.create);

    app.delete('/api/drinks/:id/:email', drinksController.remove);

    //Liquor routes

    app.get('/api/liquor', liquorController.findAll);

    app.post('/api/liquor', liquorController.create);

    app.delete('/api/liquor/:id/:email', liquorController.remove);

    //Pantry Routes
    app.get('/api/pantry', pantryController.findAll);

    app.put('/api/pantry/:id', pantryController.update)

    app.delete('/api/pantry/:id/:email', pantryController.remove);

    app.post('/api/pantry', pantryController.create);

    //External API Routes

    app.post('/api/spoon', function (req, res) {
        var queryURL = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" + process.env.foodAPIKey + "&ingredients=" + req.body.query + "&limitLicense=true&ranking=2&number=3";
        axios.get(queryURL)
            .then(response => {
                res.json(response.data);
            })
            .catch(err => {
                res.json(err);
            });
    });

    app.post("/api/spoonSumm/:id", function (req, res) {
        var querySumm = "https://api.spoonacular.com/recipes/" + req.params.id + "/summary?apiKey=" + process.env.foodAPIKey;
        axios.get(querySumm)
            .then(response => {
                    res.json(response.data);
            })
            .catch(err => console.log(err));
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
        var queryURL = "https://www.thecocktaildb.com/api/json/v2/" + process.env.drinkAPIKey + "/filter.php?i=" + req.body.query;
        axios.get(queryURL)
            .then(response => {
                res.json(response.data);
            })
            .catch(err => console.log(err));
    });
    1
    app.post("/api/drinkDetail/:id", function (req, res) {
        var queryURL = "https://www.thecocktaildb.com/api/json/v2/" + process.env.drinkAPIKey + "/lookup.php?i=" + req.params.id;
        axios.get(queryURL)
            .then(response => {
                res.json(response.data);
            })
            .catch(err => console.log(err));
    });
}

module.exports = api_routes;