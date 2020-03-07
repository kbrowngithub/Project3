const router = require("express").Router();
const recipeRoutes = require("./recipes");
const pantryRoutes = require("./pantry");
// Book routes
router.use("/recipes", recipeRoutes);
router.use("/pantry", pantryRoutes);

module.exports = router;