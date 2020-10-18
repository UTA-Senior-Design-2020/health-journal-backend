var express = require("express");
var router = express.Router();
import DB from "../database/DB";

/* GET users listing. */
router.get("/", async function (req, res) {
  try {
    const result = await DB.retrieveAllTasks();
    res.json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/:taskID", async (req, res) => {
  try {
    const taskID = req.params.taskID;
    if (!validateInputID(taskID)) throw ("task/taskID.error", err);

    const result = await DB.retrieveTask(taskID);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});


router.post("/", async (req, res) => {
  const {
    task
  } = req.body;

  try {
    const createdTaskId = await DB.addTask(task);
    res.status(201).json({
      data: {
        taskId: createdTaskId
      }
    });
  } catch (error) {
    res.status(500).send({
      error: error
    });
  }
});

router.put("/", async (req, res) => {
  const {
    task
  } = req.body;

  try {
    await DB.updateTask(task);
    res.status(200).json({
      data: {
        TaskId: task.TaskId
      }
    });
  } catch (error) {
    res.status(500).send({
      error: error
    });
  }
});

router.delete("/", async (req, res) => {
  const {
    TaskId
  } = req.body;

  try {
    const affectedRows = await DB.deleteTask(TaskId);
    res.status(200).json({
      affectedRows: affectedRows
    });
  } catch (error) {
    res.status(500).send({
      error: error
    });
  }
});



/** ----------Helper Functions---------- */
function validateInputID(taskID) {
  if (isNaN(taskID) || taskID.length < 0 || taskID.length > 36) {
    return false;
  } else return true;
}

module.exports = router;