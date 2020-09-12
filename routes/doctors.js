var express = require("express");
var router = express.Router();
import DB from "../scripts/DB";

/** GET All Doctors*/
router.get("/", function (req, res) {
  DB.retrieveAllDoctors(function(data) {
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(data, null, 4));
    });
  });
  
  /**  GET doctor by ID */
  router.get("/:doctorID", function (req, res) {
    let doctorID = req.params.doctorID;
    try {
      validateInputID(doctorID);
      DB.retrieveDoctor(doctorID, (result) => {
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(result, null, 4));
      });
    } catch (err) {
      res.status(400);
    }
  });
  
  /** ----------Helper Functions---------- */
  function validateInputID(doctorID) {
    if (doctorID.length > 36)
      throw Error(`Doctor ID '${doctorID}' is too long`);
  }
  
  module.exports = router;
  