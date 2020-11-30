const axios = require("axios");
axios.defaults.headers.common[
  "Authorization"
] = `token `;
module.exports = class githubAPIService {
  constructor() {
    this.url =
      "https://api.github.com/repos/martinezfran63/ElRinconcitoDelSabor";
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
    commentsUrl,
    commits,
    user,
    numOfComment,
    numOfCommit
  ) {
    let response = {};

    prTitle.forEach((title, i) => {
      response[title] = {};
      response[title]["user"] = user[i];
      response[title]["comments_url"] = commentsUrl[i];
      response[title]["number_of_comments"] = numOfComment[i];
      response[title]["commits_url"] = commits[i];
      response[title]["number_of_commit"] = numOfCommit[i];
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

      let getPullRequestComments = await this.getPullRequestComments(
        commentsUrl
      );

      console.log(getPullRequestComments)
      let getPullRequestCommmits = await this.getPullRequestCommmits(commits);

      return this.formatResponse(
        prTitle,
        commentsUrl,
        commits,
        user,
        getPullRequestComments,
        getPullRequestCommmits
      );
    } catch (error) {
      console.error(error);
    }
  }

  async getPullRequestInfo() {
    try {
      const response = await axios.get(`${this.url}/pulls?state=open`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getPullRequestComments(url) {
    //console.log(url.forEach((element) => console.log("URL: " + element)));
    try {
      const response = await axios.all(url.map((l) => axios.get(l))).then(
        axios.spread((...res) => {
          //console.log(res)
          return res;
        })
      );

      return response.map(this.checkForComments);

    } catch (error) {
      console.error(error);
    }
  }

  checkForComments = (array) => {
    let numOfComment = 0;
    if (typeof array.data === "undefined") {
      return numOfComment;
    } else {
      numOfComment = array.data.length;

      return numOfComment;
    }
  };

  async getPullRequestCommmits(url) {
    console.log(url.forEach((element) => console.log("URL: " + element)));
    try {
      const response = await axios.all(url.map((l) => axios.get(l))).then(
        axios.spread((...res) => {
          return res;
        })
      );

      const num = ["1", "2", "3", "5", "6", "7"];

      return num;
    } catch (error) {
      console.error(error);
    }
  }
};
