const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const profilePicUpload = require("../controllers/uploads/profileUpload");
const upload = require("../config/uploads");
const verifyHeaderToken = require("../middlewares/verifyHeaderToken");

router.post(
  "/profile-pic",
  verifyHeaderToken,
  upload.single("profile-pic"),
  profilePicUpload
);

module.exports = router;
