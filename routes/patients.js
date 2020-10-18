var express = require("express");
var router = express.Router();
import DB from "../database/DB";

/** GET All Patients */
router.get("/", async function (req, res) {
  try {
    const result = await DB.retrieveAllPatients();
    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

/**  GET patient by ID 
 * @returns  
 */
router.get("/:patientID", async function (req, res) {
  try {
    const patientID = req.params.patientID;
    if (!validateInputID(patientID)) res.status(400).send("PatientID is invalid");

    const result = await DB.retrievePatient(patientID);
    res.send(result);
  } catch (err) {
    res.status(400).send(err);
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