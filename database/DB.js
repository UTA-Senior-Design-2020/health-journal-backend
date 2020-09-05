/**
 * Connections to the Database are made here
 */
import patients from "../stubs/patients";
import tasks from "../stubs/tasks";

// Note: Look into pools? https://www.npmjs.com/package/mysql#pooling-connections
// var mysql = require("mysql");
// var pool = mysql.createPool({
//   connectionLimit: 10,
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: DB_PASSWORD,
//   database: DB,
// });
// pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

const DB = {
  /** ----- Tasks ----- */
  retrieveTask: function (taskID) {
    const task = tasks[taskID];
    if (patient === undefined)
      throw Error(`Task '${taskID}' does not exist in the Database`);

    return task;
  },

  /** ----- Patients ----- */
  retrievePatient: function (patientID) {
    const patient = patients.find((patient) => patient.id === patientID);
    if (patient === undefined)
      throw Error(`Patient '${patientID}' does not exist in the Database`);

    return patient;
  },

  /** ----- Doctors ----- */
  retrievePatientsByDoctor: function (doctorID) {},

  /** DEVELOPER MODE ONLY */
  retrieveAllPatients: function () {
    return patients;
  },

  retrieveAllTasks: function () {
    return tasks;
  },
};

export default DB;