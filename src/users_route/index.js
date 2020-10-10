const express = require("express");
const router = express.Router();
const usersController = require("./users_controller");
const authMiddleware = require("../middleware/auth");

router.route("/register").post(usersController.registerUser);

router.route("/authenticate").post(usersController.authUser);

router.route("/active/user").patch(usersController.activeOrDeactiveUser); // TODO: Analyse method HTTP

router
  .use(authMiddleware)
  .route("/delete/user")
  .delete(usersController.activeOrDeactiveUser);

router
  .use(authMiddleware)
  .route("/update/user")
  .put(usersController.updateUser);

module.exports = router;
