/**
 * Connections to the Database are made here
 */
require("dotenv").config();
var mysql = require("mysql");
const DBConnection = require("./DBConnection");

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

// connection.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

const DB = {
  /** ----- Tasks ----- */
  retrieveTask: function (taskID, callback) {
    const sql = `SELECT * FROM Tasks WHERE taskID = ${taskID}`;

    DBConnection.query(sql, (err, result) => {
      if (err) throw err;
      console.log(`DB.retrieveTask(${sql}):`, result);
      callback(result);
    });
  },

  /** ----- Patients ----- */
  retrievePatient: function (patientID) {
    // need to pass in patientID when aws gets updated; hardcoded [1] for now
    connection.query(
      "SELECT * FROM Patients WHERE patientID = ?",
      [1],
      function (err, result) {
        if (err) throw err;
        console.log(result);
      }
    );
  },

  /** ----- Doctors ----- */
  retrieveDoctor: function (doctorID) {
    // need to pass in doctorID when aws gets updated; hardcoded [1] for now
    connection.query("SELECT * FROM Doctors WHERE doctorID = ?", [1], function (
      err,
      result
    ) {
      if (err) throw err;
      console.log(result);
    });
  },

  /** DEVELOPER MODE ONLY */
  retrieveAllPatients: function () {
    const sql = "SELECT * FROM Patients;";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  },

  retrieveAllDoctors: function () {
    /*const sql = 'SELECT * FROM Doctors;'
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
    });*/
    console.log('hello');
  },

  retrieveAllTasks: function (callback) {
    const sql = 'SELECT * FROM Tasks;'
    connection.query(sql, function (err, result) {
      if (err) throw err;
      callback(result);
    });
  }
};

// all working hardcoded, need aws server updated to test api
//DB.retrieveAllPatients();
//DB.retrieveAllDoctors();
//DB.retrieveAllTasks();

//DB.retrieveDoctor();
//DB.retrievePatient();
//DB.retrieveTask();

//connection.end();

export default DB;
