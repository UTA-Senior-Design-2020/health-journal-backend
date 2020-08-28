var express = require("express");
var router = express.Router();
import patients from "../stubs/patients";

/* GET All Patients*/
router.get("/", function (req, res) {
  res.status(200);
  res.json(patients);
});

/* GET patient by ID */
router.get("/:patientID", function (req, res) {
  let patientID = req.params.patientID; // CHANGE THIS SOON...
  res.status(200);
  res.json(patients[patientID]);
});

module.exports = router;
