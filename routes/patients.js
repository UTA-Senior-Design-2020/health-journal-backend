var express = require("express");
var router = express.Router();
import DB from "../database/DB";

/** GET All Patients */
router.get("/", function (req, res) {
  DB.retrieveAllPatients(function (data) {
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(data, null, 4));
  });
});

/**  GET patient by ID 
 * @returns  
 */
router.get("/:patientID", function (req, res) {
  try {
    DB.retrieveAllPatients
  }
  try {
    const patientID = req.params.patientID;
    var value = validateInputID(patientID);
    console.log(value);
    if (value == true) {
      DB.retrievePatient(patientID, (result) => {
        res.header("Content-Type", "application/json");
        res.send(JSON.stringify(result, null, 4));
      });
    } else {
      res.header("Content-Type", "application/json");
      res.send(JSON.stringify("PatientID is invalid", null, 4));
    }
  } catch (err) {
    res.status(400);
  }
});

router.post("/", async function (req, res, next) {
  const {
    patient,
    address
  } = req.body;
  console.log("POST Patients/", req.body);

  let result = await DB.addPatient(patient, address);
  res.send(result);
});

/** ----------Helper Functions---------- */
function validateInputID(patientID) {
  if (isNaN(patientID) || patientID.length > 36) {
    return false;
  } else return true;
}

module.exports = router;