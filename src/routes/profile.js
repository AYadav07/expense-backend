const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const profile = require("../controllers/profile/updateProfile");
const updateProfile = require("../controllers/profile/updateProfile");
const verifyHeaderToken = require("../middlewares/verifyHeaderToken");

router.post("/update-profile", verifyHeaderToken, updateProfile);

module.exports = router;
