var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var patientsRouter = require("./routes/patients");
let tasksRouter = require("./routes/tasks");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
if (app.get("env") == "production") {
  app.use(
    morgan("common", {
      skip: function (req, res) {
        return res.statusCode < 400;
      },
      stream: __dirname + "../morgan.log",
    })
  );
} else {
  app.use(morgan("dev"));
}

app.use("/", indexRouter);
app.use("/patients", patientsRouter);
app.use("/api/tasks", tasksRouter);

module.exports = app;
