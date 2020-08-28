var express = require("express");
var router = express.Router();
// import tasks from "../stubs/tasks";
import DB from "../scripts/DB";

/* GET users listing. */
router.get("/", function (req, res) {
  const tasks = DB.retrieveAllTasks();

  res.status(200);
  res.json(tasks);
});

router.get("/:taskID", (req, res) => {
  let taskID = req.params.taskID; // CHANGE THIS SOON...
  try {
    const task = DB.retrieveTask(taskID);

    res.status(200);
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(400);
    res.send(error.message);
  }
});

/** ----------Helper Functions---------- */
function validateInputID(taskID) {
  if (taskID.length < 0 || taskID.length > 36)
    throw Error(`Patient ID '${taskID}' is too long`);
}

module.exports = router;
