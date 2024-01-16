const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const profile = require("../controllers/profile/updateProfile");
router.post("/update-profile", verifyToken, profile.updateProfile);
router.post("/change-password", verifyToken, profile.changePass);

module.exports = router;
