const mongoose = require('mongoose');
var bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  pantry: {
    type: Array
  },
  date: {
    type: Date,
    default: Date.now
  }
});


const User = mongoose.model('User', UserSchema);

User.prototype.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
// // Hooks are automatic methods that run during various phases of the User Model lifecycle
// // In this case, before a User is created, we will automatically hash their password
// User.addHook("beforeCreate", function(user) {
//   user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
// });

module.exports = User;