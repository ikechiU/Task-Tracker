import React from "react";
import Button from "./Button";

const Header = ({ onClick, onShowAddTask }) => {
  return (
    <header className="header">
      <h1>Task Tracker</h1>
      {onShowAddTask ? (
        <Button color="red" text="Close" onClick={onClick} />
      ) : (
        <Button color="green" text="Add Task" onClick={onClick} />
      )}
    </header>
  );
};

export default Header;
