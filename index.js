const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const users_route = require("./src/users_route");
const movies_route = require("./src/movies_route");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", users_route);

app.use("/api", movies_route);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is run...");
});

module.exports = app;
