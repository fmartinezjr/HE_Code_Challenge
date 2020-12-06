const axios = require("axios");
axios.defaults.headers.common[
  "Authorization"
] = `token ${process.env.GIT_TOKEN}`;
const {
  getRepoURL,
  getPropertyInformation,
  formatResponse,
  getTotalOfNestedObjects,
} = require("../utils/utils.js");

async function returnPRInfo(url) {
  const gitHubRepo = getRepoURL(url);

  try {
    const getPullRequestInfo = await this.getPullRequestInfo(gitHubRepo);
    const prTitle = getPropertyInformation(getPullRequestInfo, "title");
    const commentsUrls = getPropertyInformation(
      getPullRequestInfo,
      "comments_url"
    );
    const commits = getPropertyInformation(getPullRequestInfo, "commits_url");

    const user = getPropertyInformation(getPullRequestInfo, "login");

    const [pullRequestComments, pullRequestCommits] = await Promise.all([
      this.getPullRequestData(commentsUrls),
      this.getPullRequestData(commits),
    ]);

    const numOfComment = pullRequestComments.map(getTotalOfNestedObjects);
    const numOfCommit = pullRequestCommits.map(getTotalOfNestedObjects);
    return formatResponse(
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
async function getPullRequestInfo(url) {
  try {
    const response = await axios.get(`${url}/pulls?state=open`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function getPullRequestData(url) {
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

module.exports = {
  returnPRInfo,
  getPullRequestInfo,
  getPullRequestData,
};
