var db = require("../models")
const router = require("express").Router();
const usersController = require("../controllers/usersController");
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

    app.post("/api/messages", usersController.invite);
}
module.exports = api_routes;