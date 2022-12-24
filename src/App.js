import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import About from "./components/About";
import Tasks from "./components/Tasks";
import DeleteConfirmation from "./components/DeleteConfirmation";
import AddTask from "./components/AddTask";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [reminder, setReminder] = useState(false);
  const [id, setId] = useState(null);

  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Doctors Appointment",
      day: "Feb 5th at 2:30pm",
      reminder: true,
    },
    {
      id: 2,
      text: "Meeting at School",
      day: "Feb 6th at 1:30pm",
      reminder: true,
    },
    {
      id: 3,
      text: "Food Shoping",
      day: "Feb 5th at 2:30pm",
      reminder: false,
    },
  ]);

  const showDeleteModal = (id) => {
    console.log("Delete cliked", id);
    setId(id);
    setDisplayConfirmationModal(true);
  };

  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  const submitDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    hideConfirmationModal();
    setId(null);
  };

  const toggleReminder = (id) => {
    console.log("Double clicked", id);
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (text === "") {
      alert("Please add a task");
      return;
    }

    if (id === null) {
      addTask();
    } else {
      editTask();
    }

    console.log("text", text);
    console.log("day", day);
    console.log("reminder", reminder);

    resetInputFields()
  };

  const resetInputFields = () => {
    setText("");
    setDay("");
    setReminder(false);
  }

  const clickAddTask = () => {
    setId(null);
    resetInputFields()
    console.log("Add task clicked");
    setShowAddTask(!showAddTask);
  };

  const clickEditTask = (id) => {
    console.log("Edit task cliked");
    setShowAddTask(true);

    tasks.forEach((task) => {
      if (task.id === id) {
        setId(id);
        setText(task.text);
        setDay(task.day);
        setReminder(task.reminder);
      }
    });
  };

  const task = () => {
    return {
      text: text,
      day: day,
      reminder: reminder,
    }
  }

  const addTask = () => {
    console.log("clicked id: ", id);
    const newId = Math.floor(Math.random() * 10000) + 1
    const newTask = {newId, ...task()}
    setTasks([...tasks, newTask])
  };

  const editTask = () => {
    console.log("Edit cliked id: ", id);
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: text, day: day, reminder: reminder } : task
      )
    );
  };

  return (
    <Router>
      <DeleteConfirmation
        showModal={displayConfirmationModal}
        confirmModal={submitDelete}
        hideModal={hideConfirmationModal}
        id={id}
      />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header onClick={clickAddTask} onShowAddTask={showAddTask}/>
                {showAddTask && (
                  <AddTask
                    taskText={text}
                    onChangeTask={setText}
                    dayText={day}
                    onChangeDay={setDay}
                    reminder={reminder}
                    onChangeReminder={setReminder}
                    onSubmit={submitForm}
                  />
                )}
                <Tasks
                  tasks={tasks}
                  onEdit={clickEditTask}
                  onDelete={showDeleteModal}
                  onDoubleClick={toggleReminder}
                />
                <Link to="About">About</Link>
              </>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
