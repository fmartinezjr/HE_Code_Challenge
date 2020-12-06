const express = require("express");
const router = express.Router();
const githubAPI = require("../github/githubAPI.js");

router.post("/pr", async (req, res, next) => {
  try {
    const response = await githubAPI.returnPRInfo(req.body.url);
    res.json(response);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
