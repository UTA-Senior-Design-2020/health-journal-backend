var express = require("express");
var router = express.Router();
const multer = require('multer');
var fs = require('fs');
import DB from "../database/DB";

const upload = multer({
  dest: "public\images"
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

/* test if pic got updated */
router.get("/pic/:id", async function (req, res) {
  const temp = req.params.id;
  const doctorID = "'"+temp+"'";
  console.log(doctorID)
  try {
    const buffer = await DB.getPic(doctorID);
    console.log(buffer)
    res.json(buffer);
    fs.writeFile('publicimages/result.png', buffer, 'binary', function(err) {
      if(err) {
        console.log(err);
      } else {
          console.log("The file was saved!");
      }
    });
  } catch (err) {
    res.status(400).send({ error: "Something went wrong" });
  }
});


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

// express-fileupload. thatis all. https://i.imgur.com/2PLPfKZ.png
router.put("/upload/:id", async (req, res) => {
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" })
  }
    // accessing the file
  const myFile = req.files.file;
  //console.log(req.files.file)
  //  mv() method places the file inside public directory locally (not sure if we need)
  myFile.mv("public/images/"+myFile.name, function (err) {
    if (err) {
        console.log(err)
        return res.status(500).send({ msg: "Error occured" });
    }
  });

  const file = {
    img: myFile.data,
    name: myFile.name
  };
  //console.log(file)
  //console.log(file.name)

  const temp = req.params.id;
  const doctorID = "'"+temp+"'";

  try {
    const affectedRows = await DB.updateDoctorPicture(file, doctorID);
    res.status(200).json({ data: { affectedRows: affectedRows } });
  } catch (error) {
    res.status(500).send({ error: error });
  }

})
  
  

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
