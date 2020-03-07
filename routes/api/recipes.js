const router = require("express").Router();
const recipesController = require("../../controllers/recipesController");

// Matches with "/api/recipes"
router.route("/")
  .get(recipesController.findAll)
  .post(recipesController.create);

// Matches with "/api/recipes/:id"
router
  .route("/:id")
  .get(recipesController.findById)
  .put(recipesController.update)
  .delete(recipesController.remove);

// Matches with "/api/recipes/messages"
router.route("/messages")
  .post(recipesController.invite);

module.exports = router;