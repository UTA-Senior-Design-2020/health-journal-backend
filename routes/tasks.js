var express = require("express");
var router = express.Router();
import tasks from "../stubs/tasks";

/* GET users listing. */
router.get("/", function (req, res) {
  res.status(200);
  res.json(tasks);
});

module.exports = router;
