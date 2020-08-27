var express = require("express");
var router = express.Router();
import tasks from "../stubs/tasks";

/* GET users listing. */
router.get("/", function (req, res) {
  res.status(200);
  res.json(tasks);
});

router.get("/:taskID", (req, res) => {
  // req.params.taskID
  res.status(200);
  res.json(tasks[0]);
});

module.exports = router;
