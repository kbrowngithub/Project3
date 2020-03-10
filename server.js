const express = require("express");
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require("mongoose");
const routes = require("./routes/api_routes");
const passport = require("./config/passport");
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
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

// passport config
// var User = require('./models/user');
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// // Connect flash
// app.use(flash());

// // Global variables
// app.use(function(req, res, next) {
//   res.locals.success_msg = req.flash('success_msg');
//   res.locals.error_msg = req.flash('error_msg');
//   res.locals.error = req.flash('error');
//   next();
// });

// Add routes, both API and view
routes(app);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
