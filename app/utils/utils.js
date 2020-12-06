getRepoURL = (bodyURL) => {
  const url = new URL(bodyURL);
  return `https://api.github.com/repos${url.pathname}`;
};

getPropertyInformation = (array, key) => {
  if (key == "login") {
    return array.map(function (item) {
      return item["user"][key];
    });
  }
  return array.map(function (item) {
    return item[key];
  });
};

formatResponse = (
  prTitle,
  commentsUrls,
  commits,
  user,
  numOfComment,
  numOfCommit
) => {
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
};

//Getting the total nested objects tells us how many commits or comments there were
getTotalOfNestedObjects = (array) =>
  typeof array.data === "undefined" ? 0 : array.data.length;

module.exports = {
  getRepoURL,
  getPropertyInformation,
  formatResponse,
  getTotalOfNestedObjects,
};
