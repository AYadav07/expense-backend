const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const verifyEmailToken = require("../controllers/auth/signUptokenVerification");
const resetPass = require("../controllers/auth/resetPassword");
const verifyToken = require("../middlewares/verifyToken");
const changePassword = require("../controllers/auth/changePass");

router.post("/sign-up", authController.signUp);
router.post("/sign-in", authController.signIn);
router.get("/verify", verifyEmailToken);
router.post("/reset-pass-req", resetPass.resetPassRequest);
router.get("/resetPass-verify", resetPass.resetPassTokenVerification);
router.post("/reset-password", verifyToken, resetPass.resetPassword);
router.post("/change-pass", verifyToken, changePassword);

module.exports = router;
