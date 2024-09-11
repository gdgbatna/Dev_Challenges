const express = require("express");
const router = express.Router();
const {
  login,
  registerUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
  logout,
} = require("../controllers/authController");
const { ValidInformationRegister, ValidInformationLogin } = require("../middleware/validInformation");
const {
  authenticateUser,
} = require("../middleware/authentication");

router.post("/login", ValidInformationLogin, login);
router.post("/register", ValidInformationRegister , registerUser);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.delete("/logout", authenticateUser , logout);



module.exports = router;
