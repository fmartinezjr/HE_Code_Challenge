const express = require("express");
const router = express.Router();
const githubAPIService = require("../github/githubAPIService.js");
require("dotenv").config();

router.get("/pr", (req, res, next) => {
  const github = new githubAPIService({});
  const prInfo = github.returnPRInfo();

  res.send(prInfo);
});

module.exports = router;
