const db = require("../models");

module.exports = {
    findAll: function(req, res) {
        db.Pantry
          .find(req.query)
          .sort({ date: -1 })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
    },
    findById: function(req, res) {
        db.Pantry
          .findById(req.params.id)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
    },
    create: function(req,res) { 
      db.Pantry.findOne({ userEmail: req.body.userEmail }, function(user) {
        console.log("Uservar: " + user)
        if (user) {
          console.log("User found")
        } else {
          console.log("No user")
        }
      })

      db.Pantry
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
            console.log("Getting user email: " + req.body.userEmail)
    },
    update: function(req, res) {
        console.log(req.body.quantity)
        db.Pantry
          .findOneAndUpdate({ _id: req.params.id }, {quantity: req.body.quantity})
          .then(dbModel => {
            console.log(dbModel)
            res.json(dbModel)})
          .catch(err => res.status(422).json(err));
      },
    remove: function(req, res) {
      console.log(req);
        db.Pantry
          .findById({ _id: req.params.id })
          .then(dbModel => {
   
            dbModel.remove()
          })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
    }
} 