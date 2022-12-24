import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faEdit } from "@fortawesome/free-solid-svg-icons";

const Task = ({ task, onEdit, onDelete, onDoubleClick }) => {

  return (
    <div
      className={`task ${task.reminder ? "reminder" : ""}`}
      onDoubleClick={() => onDoubleClick(task.id)}
    >
      <h3>
        {task.text}
        <div>
          <FontAwesomeIcon
            icon={faEdit}
            style={{ color: "green", cursor: "pointer" }}
            onClick={onEdit}
          />
          &nbsp; &nbsp;
          <FontAwesomeIcon
            icon={faTimes}
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => onDelete(task.id)}
          />
        </div>
      </h3>
      <p>{task.day}</p>
    </div>
  );
};

export default Task;
