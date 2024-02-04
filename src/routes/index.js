const express = require("express");
const router = express.Router();
const auth = require("./auth");
const expense = require("./expense");
const profile = require("./profile");
const upload = require("./upload");

router.use("/auth", auth);
router.use("/expense", expense);
router.use("/profile", profile);
router.use("/upload", upload);

module.exports = router;
