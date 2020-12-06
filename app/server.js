const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
let express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const pullRequestRouter = require("./routes/pullrequest");
const PORT = process.env.PORT || 8080;
app.use("/", pullRequestRouter);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});

module.exports = app;
