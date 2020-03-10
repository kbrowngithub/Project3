var db = require("../models")
const express = require('express');
const router = express.Router();
const usersController = require("../controllers/usersController");
var passport = require("../config/passport");
var ensureAuthenticated = require("../config/middleware/auth");

function api_routes(app) {
    app.get("/", function(req, res) {
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
        // res.json(req.user);
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
}


module.exports = api_routes;