/**
 * Connections to the Database are made here
 */
import patients from "../stubs/patients";
import tasks from "../stubs/tasks";
// Note: Look into pools? https://www.npmjs.com/package/mysql#pooling-connections

const DB = {
  /** ----- Tasks ----- */
  retrieveTask: function (taskID) {
    const task = tasks[taskID];
    if (patient === undefined)
      throw Error(`Task '${taskID}' does not exist in the Database`);

    return task;
  },

  retrieveTask: function (taskID) {
    const task = tasks.find((task) => task.id === taskID);
    if (task === undefined)
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
