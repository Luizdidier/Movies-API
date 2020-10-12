const express = require("express");
const router = express.Router();
const moviesController = require("./movies_controller");
const authMiddleware = require("../middleware/auth");

router.use(authMiddleware);

router.route("/list/movies").get(moviesController.getMovies);

router.route("/create/movies").post(moviesController.createMovies);

module.exports = router;
