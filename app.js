var cors = require("cors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var rfs = require("rotating-file-stream");
var indexRouter = require("./routes/index");
var patientsRouter = require("./routes/patients");
let tasksRouter = require("./routes/tasks");
var doctorsRouter = require("./routes/doctors");
var todosRouter = require("./routes/todos");
var appointmentsRouter = require("./routes/appointments");
var bodyParser = require("body-parser");

var app = express();

// add this one after var app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
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
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

app.use("/", indexRouter);
app.use("/patients", patientsRouter);
app.use("/tasks", tasksRouter);
app.use("/doctors", doctorsRouter);
app.use("/todos", todosRouter);
app.use("/appointments", appointmentsRouter);

app.listen(8080);

module.exports = app;
