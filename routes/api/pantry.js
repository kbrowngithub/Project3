const router = require("express").Router();
const pantryController = require("../../controllers/pantryController");

// Matches with "/api/pantry"
router.route("/")
  .get(pantryController.findAll)
  .post(pantryController.create);

  
// Matches with "/api/pantry/:id"
router
  .route("/:id")
  .get(pantryController.findById)
  .put(pantryController.update)
  .delete(pantryController.remove);

module.exports = router;