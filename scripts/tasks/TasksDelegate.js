const TasksDelegate = {
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

  addTask: function (task, callback) {
    validateTask(task);
    // need to error handle now
    const sql = `INSERT INTO Tasks (Title, StartDate, Frequency, Instruction, ImpactsAdherence, TaskType, PatientId) VALUES (${task.title}, ${task.startDate}, ${task.frequency}, ${task.instruction}, ${task.impactsAdherence}, ${task.taskType}, ${task.patientId})`;

    DBConnection.query(sql, (err, result) => {
      if (err) throw err;
      console.log(
        `Task ${task.title} Inserted with taskID: ${result.insertId}`
      );
      callback(result);
    });
  },

  addTasks: function (tasks, callback) {
    tasks.forEach((task) => {
      validateTask(task);
    });
  },
};

function validateTask(task) {
  if (typeof task !== "object") {
    throw Error(
      `Task Error: Required an object, instead received ${typeof task} instead.`
    );
  }

  if (!task.title || !task.patientId) {
    throw Error(`Task Error: Invalid Task object`);
  }
}

export default TasksDelegate;
