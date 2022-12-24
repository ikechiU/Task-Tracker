import React from "react";
import Task from "./Task";

const Tasks = ({ tasks, onEdit, onDelete, onDoubleClick }) => {
  return (
    <div>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onEdit={() => onEdit(task.id)}
          onDelete={onDelete}
          onDoubleClick={onDoubleClick}
        />
      ))}
    </div>
  );
};

export default Tasks;
