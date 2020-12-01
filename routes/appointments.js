var express = require("express");
var router = express.Router();
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
      res.send(result);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  /**  GET appointmentLast by patientID
 * @returns
 */
router.get("/:patientID/appointmentLast", async function (req, res) {
    try {
      const patientID = req.params.patientID;
      console.log("patientID: "+patientID)
      if (!validateInputID(patientID))
        res.status(400).send("PatientID is invalid");
    
      const result = await DB.retrieveAppointmentLast(patientID);
      console.log("result from retrieveAppointmentLast: "+result)
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