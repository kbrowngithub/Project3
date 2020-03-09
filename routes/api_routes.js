var db = require("../models")
const router = require("express").Router();
const usersController = require("../controllers/usersController");
const smsController = require("../controllers/smsController");
function api_routes(app) {
    app.get("/", function (req, res) {
        res.send("Hello World");
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

    //   app.post('/api/sms', (req, res) => {
    //     console.log(`Hit the localhost:1337/sms post route`);
    //     const twiml = new MessagingResponse();

    //     if (req.body.Body == 'YES') {
    //       twiml.message('Great! Go to this url: https://bachelor-helper-recipes.herokuapp.com/');
    //     } else if (req.body.Body == 'NO') {
    //       twiml.message('Okay. Maybe some other time.');
    //     } else {
    //       twiml.message(
    //         'No Body param match, Twilio sends this in the request to your server.'
    //       );
    //     }

    //     res.writeHead(200, {'Content-Type': 'text/xml'});
    //     res.end(twiml.toString());
    //   });
}
module.exports = api_routes;