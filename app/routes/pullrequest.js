const express = require("express");
const router = express.Router();
const githubAPIService = require("../github/githubAPIService.js");

router.get("/pr", async (req, res, next) => {
  try {
    const github = new githubAPIService({});
    res.locals.prInfo = await github.returnPRInfo();
    res.json(res.locals.prInfo);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
