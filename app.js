var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var rfs = require("rotating-file-stream");
var indexRouter = require("./routes/index");
var patientsRouter = require("./routes/patients");
let tasksRouter = require("./routes/tasks");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
if (app.get("env") === "production") {
  app.use(
    logger("combined", {
      skip: function (req, res) {
        return res.statusCode < 400;
      },
      stream: rfs.createStream("request.log", {
        interval: "1d",
        path: path.join(__dirname, "logs"),
      }),
    })
  );
} else {
  app.use(logger("dev"));
}

app.use("/", indexRouter);
app.use("/api/patients", patientsRouter);
app.use("/api/tasks", tasksRouter);

module.exports = app;
