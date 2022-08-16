const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Should be in first commit!");
});

module.exports = app;
