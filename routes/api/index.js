const router = require("express").Router();
const recipeRoutes = require("./recipes");

// routes
router.use("/recipes", recipeRoutes);

module.exports = router;