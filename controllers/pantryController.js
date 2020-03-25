const db = require("../models");

module.exports = {
  findAll: function (req, res) {
    db.Pantry
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Pantry
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Pantry.findOne({ userEmail: req.body.userEmail }, function (err, user) {
      if (err) { console.log(err) }
      if (user) {
        var newIngredient = {
          name: req.body.ingredients.name,
          quantity: req.body.ingredients.quantity,
          unit: req.body.ingredients.unit
        }
        db.Pantry.findOneAndUpdate(
          { userEmail: req.body.userEmail },
          { $push: { ingredients: newIngredient } }
        )
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
      } else {
        db.Pantry
          .create(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      }
    })
  },
  update: function (req, res) {
    db.Pantry
      .findOneAndUpdate({ userEmail: req.body.email, "ingredients._id": req.params.id },
        { $set: { "ingredients.$.quantity": req.body.quantity } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Pantry
      .update({ userEmail: req.params.email },
        { $pull: { ingredients: { _id: req.params.id } } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
} 