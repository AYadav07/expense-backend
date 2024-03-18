const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const verifyEmailToken = require("../controllers/auth/signUpTokenVerification");
const resetPass = require("../controllers/auth/resetPassword");
const verifyToken = require("../middlewares/verifyToken");
const changePassword = require("../controllers/auth/changePass");
const usernameAvail = require("../controllers/auth/checkUsernameAvail");
const logout = require("../controllers/auth/logout");
const isLogged = require("../controllers/auth/checkAuth");
const verifyHeaderToken = require("../middlewares/verifyHeaderToken");

router.post("/sign-up", authController.signUp);
router.post("/sign-in", authController.signIn);
router.get("/verify", verifyEmailToken);
router.post("/reset-pass-req", resetPass.resetPassRequest);
router.get("/resetPass-verify", resetPass.resetPassTokenVerification);
router.post(
  "/reset-password",
  verifyHeaderToken /*verifyToken*/,
  resetPass.resetPassword
);
router.post("/change-pass", verifyHeaderToken, changePassword);
router.get("/check-username", usernameAvail);
router.get("/logout", verifyHeaderToken, logout);
router.get("/check-login-status", verifyHeaderToken, isLogged);

module.exports = router;
