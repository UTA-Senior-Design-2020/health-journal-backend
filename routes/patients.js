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
  try {
    const patientID = req.params.patientID;
    var value = validateInputID(patientID);
    console.log(value);
    if (value == true) {
      DB.retrievePatient(patientID, (result) => {
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(result, null, 4));
      });
    }
    else {
      res.header("Content-Type",'application/json');
      res.send(JSON.stringify('PatientID is invalid', null, 4));
    }
  } catch (err) {
    res.status(400);
  }

});

/** ----------Helper Functions---------- */
function validateInputID(patientID) {
  if (isNaN(patientID) || patientID.length > 36){
    return false;
  }
  else 
    return true;
}

module.exports = router;
