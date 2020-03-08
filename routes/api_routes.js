var db = require("../models")
function api_routes(app) {
    app.get("/", function(req, res) {
        res.send("Hello World");
    })
    app.get("/api/users", function(req, res) {
        db.User.find({}).then(function(data) {
            res.json(data)
        })
    })
}
module.exports = api_routes;