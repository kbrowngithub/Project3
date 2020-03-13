var db = require("../models")
var passport = require("../config/passport");
const usersController = require("../controllers/usersController");
const smsController = require("../controllers/smsController");
const pantryController = require("../controllers/pantryController");
const axios = require("axios");

function api_routes(app) {
    app.get("/", function (req, res) {
        res.send("Hello World");
    })

    app.get("/api/users", function(req, res) {
        db.User.find({}).then(function(data) {
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
      
    
    app.post("/api/login", passport.authenticate("local"), function(req, res) {
        console.log("LOGIN REQUEST RECIEVED")
        res.json(req.user);
    });

    // Logout
    app.get('/logout', (req, res) => {
        console.log("Logout")
        req.logout();
        res.send("Logout!");
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
    
    app.get('/api/pantry', pantryController.findAll);
    
    app.put('/api/pantry/:id', pantryController.update)

    app.delete('/api/pantry/:id', pantryController.remove);

    app.post('/api/spoon', function (req, res) {
        var queryURL = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" + process.env.foodAPIKey + "&ingredients=" + req.body.query + "&number=20&ignorePantry=true";
        axios.get(queryURL)
        .then(response => {
            var recipeSumms = [];
            response.data.map(recipe => {
                    var querySumm = "https://api.spoonacular.com/recipes/" + recipe.id + "/summary?apiKey=" + process.env.foodAPIKey;
                    axios.get(querySumm)
                    .then(data => {
                        recipeSumms.push(data.data);
                        if (recipeSumms.length === response.data.length) {
                            res.json({ query1: response.data, query2: recipeSumms });
                        }   
                    })
                    .catch(err => {
                        console.log(err);
                    })
            });      
        })
        .catch(err => {
            res.json(err);
        });
    });
    
    app.post("/api/drink", function(req,res) {
        var queryURL = "https://www.thecocktaildb.com/api/json/v1/" + process.env.drinkAPIKey + "/filter.php?i=" + req.body.query;
            axios.get(queryURL)
            .then(response=> {
                res.json(response.data);
            })
                .catch(err => console.log(err));
    })
}

module.exports = api_routes;