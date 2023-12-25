const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const routes = require("./src/routes");
const mongoose = require("./src/config/mongoose");
const port = process.env.PORT || 7777;

app.use(express.json());
app.use("/api", routes);
app.listen(port, (err) => {
  console.log("App started at port: " + port);
});
