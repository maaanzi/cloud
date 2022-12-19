let express = require("express");
let app = express();
app.use(express.static("public"));

app.listen(3000, function () {
  console.log("3000번 포트 대기중~");
});

app.get("/", function (req, res) {
  res.sendFile("public/index.html");
});
