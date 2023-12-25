const express = require("express");
const router = express.Router();
const auth = require("./auth");
const expense = require("./expense");

router.use("/auth", auth);
router.use("/expense", expense);

module.exports = router;
