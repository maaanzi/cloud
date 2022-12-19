const express = require("express");
const nunjucks = require("nunjucks");
const path = require("path");
const app = express();
const { image } = require("./upload");

app.set("view engine", "html");
app.set("views", process.cwd() + "/src/views");
nunjucks.configure("src/views", {
  autoescape: true,
  express: app,
  watch: true,
});
app.use(express.static("public"));

app.listen(3000, function () {
  console.log("3000번 포트 대기중~");
});

app.use("/css", express.static(path.join(process.cwd(), "src/public")));

app.use("/upload", express.static("upload"));
app.post("/", image.single("image"), (req, res) => {
  console.log(req.file);
  const img = req.file.location;
  return res.render(path.join(process.cwd(), "src/views/index.html"), { img });
});

app.get("/", function (req, res) {
  console.log(process.cwd());
  res.sendFile(path.join(process.cwd(), "src/views/index.html"));
});
