const db = require("../models");

module.exports = {
    findAll: function(req, res) {
      db.Drink
        .find(req.query)
        .sort({ date: -1 })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    findById: function(req, res) {
      db.Drink
        .findById(req.params.id)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
      db.Drink.findOne({ userEmail: req.body.userEmail }, function (err, user) {
        if (err) {console.log(err)}
  
        if (user) {
          var newDrink = {
            title: req.body.drink.title,
            image: req.body.drink.image,
            idDrink: req.body.drink.idAPI,
            ingredients: req.body.drink.ingredients,
            instructions: req.body.drink.instructions
          }
      
          db.Drink.findOneAndUpdate(
            { userEmail: req.body.userEmail },
            { $push : { drinks: newDrink }}
          )
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
        } else {
          db.Drink
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
        }
      })
    },
    update: function(req, res) {
      let newRecipe = req.body.newData;
      db.Recipe
        .findOneAndUpdate({ userEmail: req.body.email, "drinks._id": req.params.id }, 
          { $set: { drinks: newDrink } },
          {new: true}  
        )
        .then(dbModel => {
          res.json(dbModel)
        })
        .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
      db.Drink
      .update({ userEmail: req.params.email },
        { $pull: {drinks: { _id: req.params.id}}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
    }
}