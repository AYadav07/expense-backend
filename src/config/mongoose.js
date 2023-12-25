const mongoose = require("mongoose");

mongoose.connect(process.env.mongoURL);

mongoose.connection.on(
  "error",
  console.error.bind(console, "error connecting to db")
);

mongoose.connection.once("open", function () {
  console.log("successfullly connected to database..!...");
});
