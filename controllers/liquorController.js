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
          console.log("liquorCon, User found");

          var newLiquor = {
            name: req.body.liquors.name
          }

          console.log(newLiquor);

          db.Liquor.findOneAndUpdate(
            { userEmail: req.body.userEmail },
            { $push : { liquors: newLiquor }}
          )
          .then(dbModel => {res.json(dbModel)
          console.log(dbModel)})
          .catch(err => res.status(422).json(err))
        } else {
          db.Liquor
          .create(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
          console.log("Getting user email: " + req.body.userEmail)
        }
      })
    },
    remove: function(req, res) {
      console.log("Req params: ",req.params.id);
      console.log("email",req.params.email);
      db.Liquor
      .update({ userEmail: req.params.email },
        { $pull: {liquors: { _id: req.params.id}}})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
}