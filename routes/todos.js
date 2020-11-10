var express = require("express");
var router = express.Router();
// import tasks from "../stubs/tasks";
import DB from "../database/DB";


router.use(express.json());
router.use(express.urlencoded({ extended: true }));

/* GET users listing. */
router.get("/", function (req, res) {
    try {
      DB.retrieveAllTodos(function (data) {
        res.json(data);
      });
    } catch (err) {
      res.status(400).send({ error: "Something went wrong" });
    }
});

/**  GET todo by doctorID */
router.get("/:doctorID", (req, res) => {
    try {
      const doctorID = req.params.doctorID;
      var value = validateInputID(doctorID);
      if (value == true) {
        DB.retrieveTodo(doctorID, (result) => {
          res.json(result);
        });
      } else {
        res.status(404).send({ error: "Invalid DoctorID" });
      }
    } catch (err) {
        res.status(400).send({ error: "Bad Request" });
    }
});

router.put("/", async (req, res) => {
    try {
      await DB.updateTodo(req.body);
      res.status(200).json({ data: { TodoId: req.body.todoId } });
    } catch (error) {
      res.status(500).send({ error: error });
    }
});

router.delete("/", async (req, res) => {
    const { TodoId } = req.body;
    try {
      const affectedRows = await DB.deleteTask(TodoId);
      res.status(200).json({ affectedRows: affectedRows });
    } catch (error) {
      res.status(500).send({ error: error });
    }
});


router.post("/", async (req, res) => {
    try {
      const createdTodoId = await DB.addTodo(req.body);
      res.status(201).json({ data: { todoId: createdTodoId } });
    } catch (error) {
      res.status(500).send({ error: error });
    }
});

/** ----------Helper Functions---------- */
function validateInputID(doctorID) {
    if (isNaN(doctorID) || doctorID.length > 36) {
      return false;
    } else return true;
}

module.exports = router;