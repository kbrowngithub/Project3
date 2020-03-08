const router = require("express").Router();
const recipeRoutes = require("./recipes");

// Book routes
router.use("/recipes", recipeRoutes);

module.exports = router;