var express = require("express");
var router = express.Router();
import DB from "../database/DB";

/** GET All Doctors*/
router.get("/", function (req, res) {
  try {
    DB.retrieveAllDoctors(function (data) {
      res.json(data);
    });
  } catch (err) {
    res.status(400).send({ error: "Something went wrong" });
  }
});

router.post("/", async (req, res) => {
  const doctor = req.body;

  try {
    const createdDoctorId = await DB.addDoctor(doctor);
    res.status(201).json({ data: { doctorId: createdDoctorId } });
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

router.put("/", async (req, res) => {
  const doctor = req.body;

  try {
    await DB.updateDoctor(doctor);
    res.status(200).json({ data: { doctorId: doctor.DoctorId } });
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

router.delete("/", async (req, res) => {
  const doctor = req.body;

  try {
    const affectedRows = await DB.deleteDoctor(doctor);
    res.status(200).json({ affectedRows: affectedRows });
  } catch (error) {
    res.status(500).send({ error: error });
  }
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
