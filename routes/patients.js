var express = require("express");
var router = express.Router();
import DB from "../scripts/DB";

/** GET All Patients*/
router.get("/", function (req, res) {
  DB.retrieveAllPatients(function(data) {
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(data, null, 4));
    });
  });

/**  GET patient by ID */
router.get("/:patientID", function (req, res) {
  let patientID = req.params.patientID; // CHANGE THIS SOON...
  try {
    validateInputID(patientID);
    DB.retrievePatient(patientID, (result) => {
      res.header("Content-Type",'application/json');
      res.send(JSON.stringify(result, null, 4));
    });
  } catch (err) {
    res.status(400);
  }
});

/** ----------Helper Functions---------- */
function validateInputID(patientID) {
  if (patientID.length > 36)
    throw Error(`Patient ID '${patientID}' is too long`);
}

module.exports = router;
