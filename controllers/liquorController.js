const db = require("../models");

module.exports = {
    findAll: function(req, res) {
      db.Liquor
        .find(req.query)
        .sort({ date: -1 })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    findById: function(req, res) {
      db.Liquor
        .findById(req.params.id)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
      db.Liquor.findOne({ userEmail: req.body.userEmail }, function(err, user){
        if(err) {console.log(err)}
        if (user) {

          var newLiquor = {
            name: req.body.liquors.name
          }

          db.Liquor.findOneAndUpdate(
            { userEmail: req.body.userEmail },
            { $push : { liquors: newLiquor }}
          )
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
        } else {
          db.Liquor
          .create(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));

        }
      })
    },
    remove: function(req, res) {
      db.Liquor
      .update({ userEmail: req.params.email },
        { $pull: {liquors: { _id: req.params.id}}})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
}