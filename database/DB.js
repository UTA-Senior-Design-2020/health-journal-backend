/**
 * Connections to the Database are made here
 */
require("dotenv").config();
var mysql = require("mysql");
const DBConnection = require("./DBConnection");

const DB = {
  /** ----- Tasks ----- */
  // UPDATE `dev`.`Tasks` SET `Title` = 'Jump' WHERE (`TaskId` = '5');

  retrieveTask: async function (taskID) {
    const sql = `SELECT * FROM Tasks WHERE taskID = ${taskID}`;

    return new Promise((resolve, reject) => {
      try {
        // TODO: Validate
        DBConnection.query(sql, (err, result) => {
          if (err) reject(err);
          console.log("DB.retrieveTask.result->", result);
          resolve(result);
        });
      } catch (err) {
        reject(err);
      }
    });
  },

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
        resolve(formatResponse(taskId));
      });
    });
  },

  deleteTask: async function (TaskId) {
    const sql = `DELETE FROM Tasks WHERE TaskId = '${TaskId}'`;

    return new Promise((resolve, reject) => {
      DBConnection.query(sql, (err, result) => {
        if (err) reject(err);

        resolve(formatResponse(result.affectedRows));
      });
    });
  },

  /** ----- Tasks Logs ----- */
  // TODO
  completeTask: async function (patientID, taskID, dateCompleted, notes) {
    const sql = `
      INSERT INTO TaskLog(TaskId, DateCompleted, Notes)
      VALUES(${taskID}, '${dateCompleted}', '${notes}')`;

    // TODO - verify that the given patient owns this task

    return new Promise((resolve, reject) => {
      DBConnection.query(sql, (err, result) => {
        if (err) reject(err);

        resolve(result);
      });
    });
  },

  /** ----- Patients ----- */
  /** retrievePatient returns a patient by the given patientID
   * @param patientID id of the patient following a [INSERT PATIENT ID REQUIREMENTS]
   **/
  retrievePatient: async function (patientID) {
    const sql = `SELECT * FROM Patients WHERE PatientId = ${patientID}`;

    return new Promise((resolve, reject) => {
      DBConnection.query(sql, (err, result) => {
        if (err) reject(err);
        if (result.length > 0) resolve(result);
        else reject("PatientID does not exist in DB");
      });
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
        resolve(formatResponse(result.insertId));
      });
    });
  },

  retrievePatientTasks: async function (patientID) {
    const sql = `
      SELECT * 
      FROM Tasks 
      WHERE PatientId=${patientID}`;

    return new Promise((resolve, reject) => {
      if (!validatePatient(patientID)) reject("Bad PatientId given");

      DBConnection.query(sql, (err, result) => {
        console.log(sql, result);
        if (err) reject(err);
        resolve(formatResponse(result));
      });
    });
  },

  /** retrievePatientTasksByDay - Will return all of the given patients Tasks for the day given.
   *  @param day - year-month-day example: "2020-09-06"
   *  @returns
   */
  retrievePatientTasksByDay: async function (patientID, day) {
    const sql = `
      SELECT * 
      FROM Tasks 
      WHERE PatientId=${patientID}
      AND StartDate between '${day} 00:00:00' and '${day} 23:59:59'`;

    return new Promise((resolve, reject) => {
      if (!validatePatient(patientID)) reject("Bad PatientId given");

      DBConnection.query(sql, (err, result) => {
        if (err) reject(err);
        resolve(formatResponse(result));
      });
    });
  },
  //Appointments
  retrieveAllAppointments: async function () {
    const sql = "SELECT * FROM Appointments;";

    return new Promise((resolve, reject) => {
      DBConnection.query(sql, function (err, result) {
        if (err) reject(err);
        resolve(result);
      });
    });
  },

  retrieveAppointmentByDoctor: async function (doctorID) {
    console.log(doctorID)
    const sql = `SELECT * FROM Appointments WHERE DoctorId = '${doctorID}'`;

    return new Promise((resolve, reject) => {
      DBConnection.query(sql, function(err, result) {
        if (err) reject(err);
        resolve(result);
      });
    });
  },

  // new function:
  // select * doctorid and patientid, from appointments, order by date,starttime DESC/ASC, 

  // TODO
  retrievePatientTasksPast7Days: async (patientId, startDay, endDay) => {},
  

  /** ----- Doctors ----- */
  retrieveDoctor: async function (doctorID) {
    const sql = `SELECT * FROM Doctors WHERE DoctorId = ${doctorID}`;

    return new Promise((resolve, reject) => {
      DBConnection.query(sql, (err, result) => {
        if (err) reject(err);
        resolve(formatResponse(result));
      });
    });
  },

  updateDoctor: async function (doctorObj) {
    const sql = `UPDATE Doctors SET DoctorId = ?, GivenName = ?, FamilyName = ?, ProfilePicture = ?, 
    Title = ?, Description = ?, Email = ?, CallPhone = ?, TextPhone = ?, AddressId = ? WHERE DoctorId = ${doctorObj.DoctorId}`;

    return new Promise((resolve, reject) => {
      try {
        validateDoctor(doctorObj);

        DBConnection.query(
          sql,
          [
            doctorObj.DoctorId,
            doctorObj.GivenName,
            doctorObj.FamilyName,
            doctorObj.ProfilePicture,
            doctorObj.Title,
            doctorObj.Description,
            doctorObj.Email,
            doctorObj.CallPhone,
            doctorObj.TextPhone,
            doctorObj.AddressId,
          ],
          (err, result) => {
            console.log(result);
            if (err) reject(err);
            resolve(result.affectedRows);
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  },

  addDoctor: async function (doctorObj) {
    const sql = `INSERT INTO Doctors SET ?`;

    return new Promise((resolve, reject) => {
      try {
        validateDoctor(doctorObj);
      } catch (error) {
        reject(error);
      }
      DBConnection.query(sql, doctorObj, (err, result) => {
        if (err) reject(err);
        const doctorId = result.insertId;
        resolve(doctorId);
      });
    });
  },

  deleteDoctor: async function (doctorObj) {
    const sql = `DELETE FROM Doctors WHERE DoctorId = '${doctorObj.DoctorId}'`;

    return new Promise((resolve, reject) => {
      DBConnection.query(sql, (err, result) => {
        if (err) reject(err);

        resolve(result.affectedRows);
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
        resolve(addressId);
      });
    });
  },

  /** ----- Todos ----- */
  retrieveTodo: function (doctorID, callback) {
    // need to error handle now
    const sql = `SELECT * FROM Todos WHERE DoctorId = ${doctorID}`;

    DBConnection.query(sql, (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        console.log(`DB.retrieveTodo(${sql}):`, result);
        callback(result);
      } else {
        callback("DoctorID does not exist in DB");
      }
    });
  },

  addTodo: function (todoObj) {
    const sql = `INSERT INTO Todos SET ?`;
    return new Promise((resolve, reject) => {
      DBConnection.query(sql, todoObj, (err, result) => {
        if (err) reject(err);

        const todoId = result.insertId;
        resolve(todoId);
      });
    });
  },

  updateTodo: function (todoObj) {
    const sql = `UPDATE Todos SET Completed = ${todoObj.completed}, isDeleted = ${todoObj.isDeleted} WHERE TodoId = ${todoObj.todoId}`;

    return new Promise((resolve, reject) => {
      try {
        DBConnection.query(sql, (err, result) => {
          if (err) reject(err);

          resolve(result.affectedRows);
        });
      } catch (error) {
        reject(error);
      }
    });
  },

  /** DEVELOPER MODE ONLY */
  retrieveAllPatients: async function () {
    const sql = "SELECT * FROM Patients;";

    return new Promise((resolve, reject) => {
      DBConnection.query(sql, function (err, result) {
        if (err) reject(err);
        resolve(result);
      });
    });
  },

  retrieveAllDoctors: async function () {
    const sql = "SELECT * FROM Doctors;";

    return new Promise((resolve, reject) => {
      DBConnection.query(sql, function (err, result) {
        if (err) reject(err);
        resolve(result);
      });
    });
  },

  retrieveAllTasks: async function () {
    const sql = "SELECT * FROM Tasks;";

    return new Promise((resolve, reject) => {
      DBConnection.query(sql, function (err, result) {
        if (err) reject(err);
        resolve(result);
      });
    });
  },

  retrieveAllTodos: function (callback) {
    // need to error handle now
    const sql = "SELECT * FROM Todos";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      callback(result);
    });
  },
};

/** ----- Helpers ----- */
function formatResponse(response) {
  return { data: response };
}

/** ----- Validate ----- */

function validateTask(taskObj) {
  if (typeof taskObj !== "object") {
    throw Error(`Required an object, instead received ${typeof task} instead.`);
  }
}

function validateDoctor(doctorObj) {
  return true;
}

function validatePatient(patientObj) {
  return true;
}

function validateAddress(addressObj) {
  return true;
}

export default DB;
