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

const DB = {
  /** ----- Tasks ----- */
  // UPDATE `dev`.`Tasks` SET `Title` = 'Jump' WHERE (`TaskId` = '5');

  updateTask: async function (taskObj) {
    const sql = `UPDATE Tasks SET ? WHERE TaskId = ${taskObj.TaskId}`;

    return new Promise((resolve, reject) => {
      try {
        validateTask(taskObj);

        DBConnection.query(sql, taskObj, (err, result) => {
          if (err) reject(err);

          resolve(result.affectedRows);
        });
      } catch (error) {
        reject(error);
      }
    });
  },

  retrieveTask: function (taskID, callback) {
    // need to error handle now
    const sql = `SELECT * FROM Tasks WHERE taskID = ${taskID}`;

    DBConnection.query(sql, (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        console.log(`DB.retrieveTask(${sql}):`, result);
        callback(result);
      } else {
        callback("TaskID does not exist in DB");
      }
    });
  },

  addTask: async function (taskObj) {
    const sql = `INSERT INTO Tasks SET ?`;

    return new Promise((resolve, reject) => {
      try {
        validateTask(taskObj);
      } catch (error) {
        reject(error);
      }
      DBConnection.query(sql, taskObj, (err, result) => {
        if (err) reject(err);

        const taskId = result.insertId;
        resolve(taskId);
      });
    });
  },

  deleteTask: async function (TaskId) {
    const sql = `DELETE FROM Tasks WHERE TaskId = '${TaskId}'`;

    return new Promise((resolve, reject) => {
      DBConnection.query(sql, (err, result) => {
        if (err) reject(err);

        resolve(result.affectedRows);
      });
    });
  },

  /** ----- Patients ----- */
  retrievePatient: function (patientID, callback) {
    // need to error handle now
    const sql = `SELECT * FROM Patients WHERE PatientId = ${patientID}`;

    DBConnection.query(sql, (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        console.log(`DB.retrievePatient(${sql}):`, result);
        callback(result);
      } else {
        callback("PatientID does not exist in DB");
      }
    });
  },

  addPatient: async function (patientObj, addressObj) {
    validatePatient(patientObj);
    validateAddress(addressObj);

    const addressId = await this.addAddress(addressObj); // Create an address on the Address table first, then get the created ID
    const sql = `INSERT INTO Patients SET ?`;
    patientObj["AddressId"] = addressId;

    return new Promise((resolve, reject) => {
      DBConnection.query(sql, patientObj, (err, result) => {
        if (err) reject(err);

        resolve(result.insertId);
      });
    });
  },
  /** ----- Doctors ----- */
  retrieveDoctor: function (doctorID, callback) {
    // need to error handle now
    const sql = `SELECT * FROM Doctors WHERE DoctorId = ${doctorID}`;
    return new Promise((resolve, reject) => {
      DBConnection.query(sql, (err, result) => {
        if (err) reject(err);

        resolve(result);
      });
    });
  },

  /** ----- Address ----- */
  // AddressId, Street, City, StateCode, PostalCode
  addAddress: function (addressObj) {
    const sql = "INSERT INTO Address SET ?";

    return new Promise((resolve, reject) => {
      DBConnection.query(sql, addressObj, (err, result) => {
        if (err) reject(err);

        const addressId = result.insertId;
        resolve(addressId);
      });
    });
  },

  /** DEVELOPER MODE ONLY */
  retrieveAllPatients: function (callback) {
    const sql = "SELECT * FROM Patients;";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      callback(result);
    });
  },

  retrieveAllDoctors: function () {
    const sql = "SELECT * FROM Doctors;";
    return new Promise((resolve, reject) => {
      connection.query(sql, function (err, result) {
        if (err) reject(err);
        resolve(result);
      });
    });
  },

  retrieveAllTasks: function (callback) {
    const sql = "SELECT * FROM Tasks;";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      callback(result);
    });
  },
};

/** ----- Validate ----- */

function validateTask(taskObj) {
  if (typeof taskObj !== "object") {
    throw Error(`Required an object, instead received ${typeof task} instead.`);
  }
}

function validatePatient(patientObj) {
  return true;
}

function validateAddress(addressObj) {
  return true;
}

export default DB;
