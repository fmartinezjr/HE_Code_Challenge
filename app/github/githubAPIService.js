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
      const prTitle = this.getTitle(getPullRequestInfo, "title");
      const commentsUrls = this.getPropertyInformation(
        getPullRequestInfo,
        "comments_url"
      );
      const commits = this.getPropertyInformation(
        getPullRequestInfo,
        "commits_url"
      );

      const user = this.getUserInformation(getPullRequestInfo, "login");

      let getPullRequestComments, getPullRequestCommmits;
      [getPullRequestComments, getPullRequestCommmits] = await Promise.all([
        this.getPullRequestData(commentsUrls),
        this.getPullRequestData(commits),
      ]);

      return this.formatResponse(
        prTitle,
        commentsUrls,
        commits,
        user,
        getPullRequestComments,
        getPullRequestCommmits
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

  //the number of nested objects tells us how many commits or comments there were
  getTotalOfNestedObjects = (array) => {
    let numNestedObjects = 0;
    if (typeof array.data === "undefined") {
      return numNestedObjects;
    } else {
      numNestedObjects = array.data.length;

      return numNestedObjects;
    }
  };

  async getPullRequestData(url) {
    try {
      const response = await axios.all(url.map((l) => axios.get(l))).then(
        axios.spread((...res) => {
          return res;
        })
      );

      return response.map(this.getTotalOfNestedObjects);
    } catch (error) {
      console.error(error);
    }
  }

};
