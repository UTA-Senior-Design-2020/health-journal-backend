var express = require("express");
var router = express.Router();
// import tasks from "../stubs/tasks";
import DB from "../database/DB";


router.use(express.json());
router.use(express.urlencoded({ extended: true }));

/** GET All Appointments */
router.get("/", async function (req, res) {
    try {
      const result = await DB.retrieveAllAppointments();
      res.send(result);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  /**  GET appointment by doctorID
 * @returns
 */
router.get("/:doctorID", async function (req, res) {
    try {
      const doctorID = req.params.doctorID;
      if (!validateInputID(doctorID))
        res.status(400).send("DoctorID is invalid");
  
      const result = await DB.retrieveAppointmentByDoctor(doctorID);
      console.log(result)
      res.send(result);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  function validateInputID(doctorID) {
    if (doctorID.length > 36) {
      return false;
    } else return true;
  }

module.exports = router;