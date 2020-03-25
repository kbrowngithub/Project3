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
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findAllContacts: function (req, res) {
    db.User
      .findOne({ email: JSON.parse(req.params.userEmail) })
      .then(dbModel => res.json(dbModel.contacts))
      .catch(err => res.status(422).json(err));
  },
  updateContacts: function (req, res) {
    db.User.findOne({ email: JSON.parse(req.params.id) }, function (err, user) {
      if (err) { console.log(err) }
      if (user) {
        var newContact = {
          name: req.body.name,
          mobile: req.body.mobile,
          email: req.body.email
        }

        // db.User.update({ name: req.params.id, contacts: {$ne: {name: req.body.name}} }, { $addToSet: { contacts: newContact } })
        db.User.findOneAndUpdate({ name: user.name }, { $addToSet: { contacts: newContact } })
          .then(dbModel => {
            res.json(dbModel)
          })
          .catch(err => res.status(422).json(err));
      }
    })
  },
  removeContact: function (req, res) {
    db.User.findOne({ email: JSON.parse(req.params.id) }, function (err, user) {
      if (err) { console.log(err) }
      if (user) {
        var newContact = {
          name: req.body.name,
          mobile: req.body.mobile,
          email: req.body.email
        }

        db.User.findOneAndUpdate({ _id: user._id }, { $pull: { contacts: newContact } })
          .then(dbModel => {
            res.json(dbModel)
          })
          .catch(err => res.status(422).json(err));
      } else {
        console.log(`Not found: ${req.params.id}`)
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