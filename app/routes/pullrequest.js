const express = require("express");
const router = express.Router();
const githubAPIService = require("../github/githubAPIService.js");

router.post("/pr", async (req, res, next) => {
  try {
    const github = new githubAPIService(req.body);
    const response = await github.returnPRInfo();
    res.json(response);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
