const db = require("../models");
const client = require('twilio')(
  process.env.TWILIO_ACCOUT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Defining methods for the recipesController
module.exports = {
  findAll: function (req, res) {
    db.Recipe
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Recipe
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Recipe.findOne({ userEmail: req.body.userEmail }, function (err, user) {
      if (err) { console.log(err) }

      if (user) {
        var newRecipe = {
          title: req.body.recipe.title,
          image: req.body.recipe.image,
          idAPI: req.body.recipe.idAPI,
          summary: req.body.recipe.summary,
          ingredients: req.body.recipe.ingredients,
          instructions: req.body.recipe.instructions,
          notes: ""
        }

        db.Recipe.findOneAndUpdate(
          { userEmail: req.body.userEmail },
          { $push: { recipes: newRecipe } }
        )
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      } else {
        db.Recipe
          .create(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      }
    })
  },
  update: function (req, res) {
    let newRecipe = req.body.newData;
    db.Recipe
      .findOneAndUpdate({ userEmail: req.body.email, "recipes._id": req.params.id },
        { $set: { recipes: newRecipe} },
        { new: true }
      )
      .then(dbModel => {
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Recipe
      .update({ userEmail: req.params.email },
        { $pull: { recipes: { _id: req.params.id } } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  invite: function (req, res) {

    res.header('Content-Type', 'application/json');
    client.messages
      .create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: req.body.to,
        body: req.body.body
      })
      .then(() => {
        res.send(JSON.stringify({ success: true }));
      })
      .catch(err => {
        console.log(err);
        res.send(JSON.stringify({ success: false }));
      });
  }
};
