let express = require("express");

const app = express();
const PORT = "8080";

const getPR = (request, response) => {
  response.send('hello pull request!');
}

app
  .route('/pullrequest')
  .get(getPR)

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`);
  });
  
  module.exports = app;