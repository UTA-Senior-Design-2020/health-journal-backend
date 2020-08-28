var express = require("express");
var router = express.Router();
import tasks from "../stubs/tasks";

/* GET users listing. */
router.get("/", function (req, res) {
  res.status(200);
  res.json(tasks);
});

router.get("/:taskID", (req, res) => {
  let taskID = req.params.taskID; // CHANGE THIS SOON...
  res.status(200);
  res.json(tasks[taskID]);
});

module.exports = router;
