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
    // need to error handle now
    const sql = `SELECT * FROM Tasks WHERE taskID = ${taskID}`;

    DBConnection.query(sql, (err, result) => {
      if (err) throw err;
      if (result.length > 0){
        console.log(`DB.retrieveTask(${sql}):`, result);
        callback(result);
      }
      else {
        callback('Task does not exist in DB');
      }
    });
  },

  /** ----- Patients ----- */
  retrievePatient: function (patientID, callback) {
    // need to error handle now
    const sql = `SELECT * FROM Patients WHERE PatientId = ${patientID}`;

    DBConnection.query(sql, (err, result) => {
      if (err) throw err;
      if (result.length > 0){
        console.log(`DB.retrievePatient(${sql}):`, result);
        callback(result);
      }
      else {
        callback('Patient does not exist in DB');
      }
    });
  },

  /** ----- Doctors ----- */
  retrieveDoctor: function (doctorID, callback) {
    // need to error handle now
    const sql = `SELECT * FROM Doctors WHERE DoctorId = ${doctorID}`;
    
    DBConnection.query(sql, (err, result) => {
      if (err) throw err;
      if (result.length > 0){
        console.log(`DB.retrieveDoctor(${sql}):`, result);
        callback(result);
      }
      else {
        callback('Doctor does not exist in DB');
      }
    });
  },

  /** DEVELOPER MODE ONLY */
  retrieveAllPatients: function (callback) {
    const sql = 'SELECT * FROM Patients;'
    connection.query(sql, function (err, result) {
      if (err) throw err;
      callback(result);
    });
  },

  retrieveAllDoctors: function (callback) {
    const sql = 'SELECT * FROM Doctors;'
    connection.query(sql, function (err, result) {
      if (err) throw err;
      callback(result);
    });
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
