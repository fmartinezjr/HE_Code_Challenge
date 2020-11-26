const express = require("express");
const router = express.Router();
require("dotenv").config();

router.get("/pr", (req, res, next) => {
  res.send('hello pull request!');
});

module.exports = router;