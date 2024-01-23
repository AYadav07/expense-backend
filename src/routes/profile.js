const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const profile = require("../controllers/profile/updateProfile");
const updateProfile = require("../controllers/profile/updateProfile");
router.post("/update-profile", verifyToken, updateProfile);

module.exports = router;
