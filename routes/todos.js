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
      console.log(value);
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