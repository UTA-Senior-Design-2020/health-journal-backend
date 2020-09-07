/**
 * Connections to the Database are made here
 */
import patients from "../stubs/patients";
import tasks from "../stubs/tasks";
import doctors from "../stubs/doctors";
require('dotenv').config();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB
})

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

const DB = {
  /** ----- Tasks ----- */
  retrieveTask: function (taskID) {
    // need to pass in taskID when aws gets updated; hardcoded [1] for now
    connection.query('SELECT * FROM Tasks WHERE taskID = ?', [1], function (err, result) {
      if (err) throw Error(`Task '${taskID}' does not exist in the Database`);;
      console.log(result);
    });
  },

  /** ----- Patients ----- */
  retrievePatient: function (patientID) {
    // need to pass in patientID when aws gets updated; hardcoded [1] for now
    connection.query('SELECT * FROM Patients WHERE patientID = ?', [1], function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  },

  /** ----- Doctors ----- */
  retrieveDoctor: function (doctorID) {
    // need to pass in doctorID when aws gets updated; hardcoded [1] for now
    connection.query('SELECT * FROM Doctors WHERE doctorID = ?', [1], function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  },

  /** DEVELOPER MODE ONLY */
  retrieveAllPatients: function () {
    const sql = 'SELECT * FROM Patients;'
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  },

  retrieveAllDoctors: function () {
    const sql = 'SELECT * FROM Doctors;'
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  },

  retrieveAllTasks: function () {
    const sql = 'SELECT * FROM Tasks;'
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  },
};

// all working hardcoded, need aws server updated to test api
//DB.retrieveAllPatients();
//DB.retrieveAllDoctors();
//DB.retrieveAllTasks();

//DB.retrieveDoctor();
//DB.retrievePatient();
//DB.retrieveTask();

connection.end();

export default DB;
