const { doesNotMatch } = require("assert");
const axios = require("axios");
var fs = require("fs");
module.exports = class githubAPIService {
  constructor() {}

  getTitle(array, key) {
    return array.map(function (item) {
      return item[key];
    });
  }

  async returnPRInfo() {
    try {
      let getPullRequestInfo = await this.getPullRequestInfo();

      let prTitle = this.getTitle(getPullRequestInfo, "title");

      return getPullRequestInfo;
    } catch (error) {
      console.error(error);
    }
  }

  async getPullRequestInfo() {
    try {
      const response = await axios.get(
        "https://api.github.com/repos/martinezfran63/ElRinconcitoDelSabor/pulls?state=open ",
        {
          //const response = await axios.get("https://codepen.io/jobs.json", {
          headers: {
            Authorization: "token 4811b9a6d7b6ce5c6d8541192ae0e72b7f0f47eb",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};
