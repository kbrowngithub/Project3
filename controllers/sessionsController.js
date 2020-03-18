const db = require("../models");

// Defining methods for the sessionsController
module.exports = {
  findAll: function(req, res) {
    db.Sessions
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findBySession: function(req, res) {
    db.Sessions
      .findById({session: session})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Sessions
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      // .catch(err => console.log(err.message));
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Sessions
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Sessions
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};