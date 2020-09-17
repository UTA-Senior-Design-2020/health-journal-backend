var express = require("express");
var router = express.Router();
// import tasks from "../stubs/tasks";
import DB from "../scripts/DB";

/* GET users listing. */
router.get("/", function (req, res) {
  try {
    DB.retrieveAllTasks(function (data) {
      res.json(data);
    });
  } catch (err) {
    res.status(400).send({ error: "Something went wrong" });
  }
});

router.get("/:taskID", (req, res) => {
  try {
    const taskID = req.params.taskID;
    var value = validateInputID(taskID);

    if (value == true) {
      DB.retrieveTask(taskID, (result) => {
        res.json(result);
      });
    } else {
      res.status(404).send({ error: "Invalid TasksID" });
    }
  } catch (err) {
    res.status(400).send({ error: "Bad Request" });
  }
});

router.post("/", (req, res) => {
  const { task, patientId } = req.body;
  console.log("request:", task, patientId);
  try {
    DB.addTask(task, (data) => {
      console.log("data from db:", data);
      res.status(200).send({ data: data });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err });
  }
});

/** ----------Helper Functions---------- */
function validateInputID(taskID) {
  if (isNaN(taskID) || taskID.length < 0 || taskID.length > 36) {
    return false;
  } else return true;
}

module.exports = router;
