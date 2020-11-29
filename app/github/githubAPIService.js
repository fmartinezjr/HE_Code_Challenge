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

  //returns the number of properties on each object
  getTotalCommentsOnEachPr(response) {
    return response.map(function (response) {
      return Object.keys(response.data).length;
    });
  }

  getPropertyInformation(array, key) {
    return array.map(function (item) {
      return item[key];
    });
  }

  async returnPRInfo() {
    try {
      let getPullRequestInfo = await this.getPullRequestInfo();

      let prTitle = this.getTitle(getPullRequestInfo, "title");
      let commentsUrl = this.getPropertyInformation(
        getPullRequestInfo,
        "comments_url"
      );
      let commits = this.getPropertyInformation(
        getPullRequestInfo,
        "commits_url"
      );

      /*       getPullRequestComments = await this.getPullRequestComments(
        commentsUrl
      ); */

      return {
        title: prTitle,
        url: commentsUrl,
        commits: commits,
      };
    } catch (error) {
      console.error(error);
    }
  }

  async getPullRequestInfo() {
    try {
      const response = await axios.get(
        "https://api.github.com/repos/martinezfran63/ElRinconcitoDelSabor/pulls?state=open",
        {
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

  async getPullRequestComments(url) {
    console.log(`\n\n ${url}`);
    try {
      let returnedComments = await axios.all(url, {
        headers: {
          Authorization: "token 4811b9a6d7b6ce5c6d8541192ae0e72b7f0f47eb",
        },
      });
      console.log(`\n\n\n`);
      console.log(
        `this is what we got back hmmm${JSON.stringify(returnedComments)}`
      );
      return returnedComments;
      //return this.getTotalCommentsOnEachPr(response)
    } catch (error) {
      console.error(error);
    }
  }
};
