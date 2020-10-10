const express = require("express");
const router = express.Router();
const moviesController = require("./movies_controller");
const authMiddleware = require("../middleware/auth");

router.use(authMiddleware);

router.route("/movies").get(moviesController.getMovies);

module.exports = router;
