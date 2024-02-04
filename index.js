const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cookieParser = require("cookie-parser");
var cors = require("cors");
const app = express();
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json());
app.use(cookieParser());
const routes = require("./src/routes");
const mongoose = require("./src/config/mongoose");
const port = process.env.PORT || 7777;
const path = require("path");

const allowedOrigins = ["https://expense-ui-six.vercel.app"];
app.use(
  cors({
    credentials: true,
    preflightContinue: true,
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "https://expense-ui-six.vercel.app"
  );
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "content-type");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Content-Type", "application/json;charset=UTF-8");

  next();
});
app.use(
  "/get-profile-pic",
  express.static(path.join(__dirname, "uploads/profile_pics"))
);

app.use("/api", routes);
app.listen(port, (err) => {
  console.log("App started at port: " + port);
});
