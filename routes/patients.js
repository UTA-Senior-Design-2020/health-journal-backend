var express = require("express");
var router = express.Router();
import DB from "../scripts/DB";

/** GET All Patients*/
router.get("/", function (req, res) {
  console.log(DB);
  const patients = DB.retrieveAllPatients();
  res.status(200);
  res.json(patients);
});

/**  GET patient by ID */
router.get("/:patientID", function (req, res) {
  let patientID = req.params.patientID; // CHANGE THIS SOON...
  try {
    validateInputID(patientID);
    const patient = DB.retrievePatient(patientID);

    res.status(200);
    res.json(patient);
  } catch (error) {
    console.error(error);
    res.status(400);
    res.send(error.message);
  }
});

/** ----------Helper Functions---------- */
function validateInputID(patientID) {
  if (patientID.length > 36)
    throw Error(`Patient ID '${patientID}' is too long`);
}

module.exports = router;
