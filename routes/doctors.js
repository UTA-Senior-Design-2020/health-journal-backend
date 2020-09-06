var express = require("express");
var router = express.Router();
import DB from "../scripts/DB";

/** GET All Doctors*/
router.get("/", function (req, res) {
    console.log(DB);
    const doctors = DB.retrieveAllDoctors();
    res.status(200);
    res.json(doctors);
  });
  
  /**  GET doctor by ID */
  router.get("/:doctorID", function (req, res) {
    let doctorID = req.params.doctorID;
    try {
      validateInputID(doctorID);
      const doctor = DB.retrieveDoctor(doctorID);
  
      res.status(200);
      res.json(doctor);
    } catch (error) {
      console.error(error);
      res.status(400);
      res.send(error.message);
    }
  });
  
  /** ----------Helper Functions---------- */
  function validateInputID(doctorID) {
    if (doctorID.length > 36)
      throw Error(`Doctor ID '${doctorID}' is too long`);
  }
  
  module.exports = router;
  