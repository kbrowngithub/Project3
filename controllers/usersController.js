const db = require("../models");

// Defining methods for the recipesController
module.exports = {
  findAll: function (req, res) {
    db.User
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByEmail: function (req, res) {
    db.User
      .findById({ email: email })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    console.log(`create req.body = ${JSON.stringify(req.body, null, 2)}`);
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      // .catch(err => console.log(err.message));
      .catch(err => res.status(422).json(err));
  },
  findAllContacts: function (req, res) {
    console.log(`findAllContacts: req.params.userEmail = ${req.params.userEmail}`);
    db.User
      .findOne({ email: JSON.parse(req.params.userEmail) })
      // .then(dbModel => console.log(`dbModel.contacts = ${dbModel.contacts}`))
      // .sort({ date: -1 })
      .then(dbModel => res.json(dbModel.contacts))
      // .then(dbModel => res.send(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateContacts: function (req, res) {
    console.log(`updateContacts: id: ${req.params.id}`);
    db.User.findOne({ email: req.params.id }, function (err, user) {
      if (err) { console.log(err) }
      if (user) {
        console.log(`User found: ${JSON.stringify(user)}`);
        var newContact = {
          name: req.body.name,
          mobile: req.body.mobile,
          email: req.body.email
        }
        console.log(`newContact: ${JSON.stringify(newContact)}`);

        db.User.findOneAndUpdate({ _id: user._id }, { $addToSet: { contacts: newContact } })
          .then(dbModel => {
            res.json(dbModel)
            console.log(`dbModel: ${dbModel}`)
          })
          .catch(err => res.status(422).json(err));
      }
    })
  },
  update: function (req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};