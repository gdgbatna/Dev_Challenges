const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authentication");

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
} = require("../controllers/userController");

router.route("/").get(authenticateUser, getAllUsers);
router.route("/showMe").get(authenticateUser, showCurrentUser);
router.route("/:id").get(authenticateUser, getSingleUser);

module.exports = router;
