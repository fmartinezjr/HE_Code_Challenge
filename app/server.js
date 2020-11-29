let express = require("express");
var pullRequestRouter = require("./routes/pullrequest");
const app = express();
const PORT = "8080";

app.use("/", pullRequestRouter);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});

module.exports = app;
