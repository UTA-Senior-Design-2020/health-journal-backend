var express = require("express");
var router = express.Router();
// import tasks from "../stubs/tasks";
import DB from "../scripts/DB";

/* GET users listing. */
router.get("/", function (req, res) {
  DB.retrieveAllTasks(function(data) {
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(data, null, 4));
  });
});

router.get("/:taskID", (req, res) => {
  try {
    const taskID = req.params.taskID;
    validateInputID(taskID);
    DB.retrieveTask(taskID, (result) => {
      res.header("Content-Type",'application/json');
      res.send(JSON.stringify(result, null, 4));
    });
  } catch (err) {
    res.status(400);
  }
});

/** ----------Helper Functions---------- */
function validateInputID(taskID) {
  if (taskID.length < 0 || taskID.length > 36)
    throw Error(`Patient ID '${taskID}' is too long`);
}

module.exports = router;
