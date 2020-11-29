const axios = require("axios");
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

  getUserInformation(array, key) {
    return array.map(function (item) {
      return item["user"][key];
    });
  }

  formatResponse(prTitle, commentsUrl, commits, user) {
    let response = {};

    prTitle.forEach((title, i) => {
      response[title] = {};
      response[title]["comments_url"] = commentsUrl[i];
      response[title]["commits_url"] = commits[i];
      response[title]["user"] = user[i];
    });
    return response;
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

      let user = this.getUserInformation(getPullRequestInfo, "login");

      /*       getPullRequestComments = await this.getPullRequestComments(
        commentsUrl
      ); */

      return this.formatResponse(prTitle, commentsUrl, commits, user);
    } catch (error) {
      console.error(error);
    }
  }

  async getPullRequestInfo() {
    try {
      const response = await axios.get(
        "https://api.github.com/repos/martinezfran63/ElRinconcitoDelSabor/pulls?state=open",
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getPullRequestComments(url) {
    console.log(`\n\n ${url}`);
    try {
      let returnedComments = await axios.all(url);
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
