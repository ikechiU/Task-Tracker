import React from "react";

const AddTask = ({taskText, onChangeTask, dayText, onChangeDay, reminder, onChangeReminder, onSubmit }) => {
  return (
    <div>
      <form className="add-form" onSubmit={onSubmit}>
        <div className="form-control">
            <label>Task</label>
            <input type='text' placeholder='Add Task' value={taskText} onChange={(e) => onChangeTask(e.target.value)}></input>
        </div>
        <div className="form-control">
            <label>Day</label>
            <input type='text' placeholder='Add Day & Time' value={dayText} onChange={(e) => onChangeDay(e.target.value)}></input>
        </div>
        <div className="form-control form-control-check">
            <label>Reminder</label>
            <input type='checkbox' checked={reminder} value={reminder} onChange={(e) => onChangeReminder(e.currentTarget.checked)}></input>
        </div>
        <input type='submit' value='Save Task' className="btn btn-block" />
      </form>
    </div>
  );
};

export default AddTask;
