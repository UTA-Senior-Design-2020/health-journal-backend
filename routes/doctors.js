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
    try {
      const doctorID = req.params.doctorID;
      var value = validateInputID(doctorID);
      console.log(value);
      if (value == true) {
        DB.retrieveDoctor(doctorID, (result) => {
          res.header("Content-Type",'application/json');
          res.send(JSON.stringify(result, null, 4));
        });
      }
      else {
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify('DoctorID is invalid', null, 4));
      }
    } catch (err) {
      res.status(400);
    }
  });
  
  /** ----------Helper Functions---------- */
  function validateInputID(doctorID) {
    if (isNaN(doctorID) || doctorID.length > 36){
      return false;
    }
    else 
      return true;
  }
  
  module.exports = router;
  