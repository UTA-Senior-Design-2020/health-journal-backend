var express = require("express");
var router = express.Router();
import DB from "../database/DB";

/** GET All Doctors*/
router.get("/", async function (req, res) {
  const data = await DB.retrieveAllDoctors();
  res.json(data);
});

/**  GET doctor by ID */
router.get("/:doctorID", async function (req, res) {
  try {
    const doctorID = req.params.doctorID;
    if (!validateInputID(doctorID)) res.status(400).send("DoctorID is invalid");

    const result = await DB.retrieveDoctor(doctorID);
    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

/** ----------Helper Functions---------- */
function validateInputID(doctorID) {
  if (isNaN(doctorID) || doctorID.length > 36) {
    return false;
  } else return true;
}

module.exports = router;