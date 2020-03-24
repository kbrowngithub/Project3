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
      db.Pantry.findOne({ userEmail: req.body.userEmail }, function(err, user) {
        if(err) {console.log(err)}
        if (user) {
          console.log("User found")

          var newIngredient = {
            name: req.body.ingredients.name,
            quantity: req.body.ingredients.quantity,
            unit: req.body.ingredients.unit
          }
          
          console.log(newIngredient)
          console.log(req.body.userEmail )

          db.Pantry.findOneAndUpdate(
            { userEmail: req.body.userEmail },
            { $push : { ingredients: newIngredient }}
          )
          .then(dbModel => {res.json(dbModel)
          console.log(dbModel)})
          .catch(err => res.status(422).json(err))
        } else {
          db.Pantry
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
            console.log("Getting user email: " + req.body.userEmail)
        }
      })

    },
    update: function(req, res) {
      console.log("updateemail: ",req.body.email)  
      console.log("id: ",req.params.id)
      console.log(req.body.quantity)
      db.Pantry
          .findOneAndUpdate({ userEmail: req.body.email , "ingredients._id": req.params.id },
          { $set : {"ingredients.$.quantity": req.body.quantity }})
          .then(dbModel => 
            res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },
    remove: function(req, res) {
      console.log("Req params: ",req.params.id);
      console.log("email",req.params.email);
        db.Pantry
          .update({ userEmail: req.params.email },
            {$pull: {ingredients: { _id: req.params.id}}})
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
    }
} 