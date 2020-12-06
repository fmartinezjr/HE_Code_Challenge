const axios = require("axios");
axios.defaults.headers.common[
  "Authorization"
] = `token ${process.env.GIT_TOKEN}`;

module.exports = class githubAPIService {
  constructor(req) {
    this.url = this.getRepoURL(req.url);
  }

  getRepoURL(bodyURL) {
    const url = new URL(bodyURL);
    return `https://api.github.com/repos${url.pathname}`;
  }

  getPropertyInformation(array, key) {
    if (array.hasOwnProperty("user")) {
      return array.map(function (item) {
        return item["user"][key];
      });
    }
    return array.map(function (item) {
      return item[key];
    });
  }

  formatResponse(
    prTitle,
    commentsUrls,
    commits,
    user,
    numOfComment,
    numOfCommit
  ) {
    const response = {};

    prTitle.forEach((title, i) => {
      response[title] = {};
      response[title]["user"] = user[i];
      response[title]["comments_url"] = commentsUrls[i];
      response[title]["number_of_comments"] = numOfComment[i];
      response[title]["commits_url"] = commits[i];
      response[title]["number_of_commit"] = numOfCommit[i];
    });
    return response;
  }

  async returnPRInfo() {
    try {
      const getPullRequestInfo = await this.getPullRequestInfo();
      const prTitle = this.getPropertyInformation(getPullRequestInfo, "title");
      const commentsUrls = this.getPropertyInformation(
        getPullRequestInfo,
        "comments_url"
      );
      const commits = this.getPropertyInformation(
        getPullRequestInfo,
        "commits_url"
      );

      const user = this.getPropertyInformation(getPullRequestInfo, "login");

      const [pullRequestComments, pullRequestCommits] = await Promise.all([
        this.getPullRequestData(commentsUrls),
        this.getPullRequestData(commits),
      ]);

      const numOfComment = pullRequestComments.map(
        this.getTotalOfNestedObjects
      );

      const numOfCommit = pullRequestCommits.map(this.getTotalOfNestedObjects);

      return this.formatResponse(
        prTitle,
        commentsUrls,
        commits,
        user,
        numOfComment,
        numOfCommit
      );
    } catch (error) {
      console.error(error);
    }
  }

  //api calls gives us comments_url and commits_url
  async getPullRequestInfo() {
    try {
      const response = await axios.get(`${this.url}/pulls?state=open`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  //Getting the total nested objects tells us how many commits or comments there were
  getTotalOfNestedObjects = (array) =>
    typeof array.data === "undefined" ? 0 : array.data.length;

  async getPullRequestData(url) {
    try {
      const response = await Promise.all(url.map((l) => axios.get(l))).then(
        axios.spread((...res) => {
          return res;
        })
      );

      return response;
    } catch (error) {
      console.error(error);
    }
  }
};
