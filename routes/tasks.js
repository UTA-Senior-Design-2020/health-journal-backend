var express = require("express");
var router = express.Router();
// import tasks from "../stubs/tasks";
import DB from "../database/DB";

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

router.post("/", async (req, res) => {
  const { task } = req.body;

  try {
    const createdTaskId = await DB.addTask(task);
    res.status(201).json({ data: { taskId: createdTaskId } });
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

router.put("/", async (req, res) => {
  const { task } = req.body;

  try {
    await DB.updateTask(task);
    res.status(200).json({ data: { TaskId: task.TaskId } });
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

router.delete("/", async (req, res) => {
  const { TaskId } = req.body;

  try {
    const affectedRows = await DB.deleteTask(TaskId);
    res.status(200).json({ affectedRows: affectedRows });
  } catch (error) {
    res.status(500).send({ error: error });
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

/** ----------Helper Functions---------- */
function validateInputID(taskID) {
  if (isNaN(taskID) || taskID.length < 0 || taskID.length > 36) {
    return false;
  } else return true;
}

module.exports = router;
