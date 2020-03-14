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
    
    app.get('/api/pantry', pantryController.findAll);

    app.post('/api/spoon', function (req, res) {
        var queryURL = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" + process.env.foodAPIKey + "&ingredients=" + req.body.query + "&number=2&ignorePantry=true";
        axios.get(queryURL)
        .then(response => {
            console.log(response)
            res.json(response.data);
        })
        .catch(err => {
            res.json(err);
        });
    });
}


module.exports = api_routes;