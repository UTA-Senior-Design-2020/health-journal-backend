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

  retrieveTask2: function (taskID, callback) {
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
};

export default TasksDelegate;
