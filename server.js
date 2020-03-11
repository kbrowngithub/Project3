const express = require("express");
const session = require('express-session');
const mongoose = require("mongoose");
const routes = require("./routes/api_routes");
const passport = require("./config/passport");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3001;

// Twilio Response Server
// const http = require('http');

// Define middleware here
// Twilio Specific
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/recipedb");
// mongoose.connect(process.env.MONGODB_URI || "mongodb://user1:password1@ds111940.mlab.com:11940/heroku_h7kb0lk7");

// Express session
app.use(
  session({
    secret: 'keyboardkitty',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Add routes, both API and view
routes(app);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
