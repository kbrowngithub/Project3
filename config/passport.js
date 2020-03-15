var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcryptjs');
var db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: "email"
  },
  function(email, password, done) {
    // When a user tries to sign in this code runs
    console.log("Local Strategy hit")
    db.User.findOne({
        email: email
    }).then(function(user) {
      // If there's no user with the given email
      if (!user) {
        console.log("User not found")
        return done(null, false, {
          message: "Incorrect email."
        });
      }
    //   If there is a user with the given email, but the password the user gives us is incorrect
      else if (!user.validPassword(password)) {
        console.log("Incorrect password")
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      
      // If none of the above, return the user
      console.log("User authed")
      // console.log("User data: ",user)
      return done(null, user);
    });
  }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, done) {
  done(null, user);
  if (user) {
    console.log("USER IS NOW LOGGED IN");
  };
});

passport.deserializeUser(function(email, done) {
  db.User.findOne({
    email: email
  }).then(function(user) {
    done(null, user);
    if (!user) {
      console.log("NO USER");
    }
  })
  
});





// Exporting our configured passport
module.exports = passport;
