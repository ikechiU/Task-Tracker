import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
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

  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async() => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  const fetchTasks = async () =>  {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data;
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json()

    return data;
  }

  const deleteTask = async () => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const showDeleteModal = (id) => {
    console.log("Delete cliked", id);
    setId(id);
    setDisplayConfirmationModal(true);
  };

  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  const submitDelete = async (id) => {
    await deleteTask(id)
  
    hideConfirmationModal();
    setId(null);
    setShowAddTask(false)
  };

  const toggleReminder = async (id) => {
    console.log("Double clicked", id);
    const task = await fetchTask(id)
    const updatedTask = {...task, reminder: !task.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method:'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json()
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task))

    // setTasks(
    //   tasks.map((task) =>
    //     task.id === id ? { ...task, reminder: !task.reminder } : task
    //   )
    // );
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
    setShowAddTask(false)
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

  const task = {
    text: text,
    day: day,
    reminder: reminder,
  }

  const addTask = async () => {
    console.log("clicked id: ", id);
    const res = await fetch("http://localhost:5000/tasks", {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()
    setTasks([...tasks, data])    
    // const newId = Math.floor(Math.random() * 10000) + 1
    // const newTask = {newId, ...task()}
    // setTasks([...tasks, newTask])
  };

  const editTask = async () => {
    console.log("Edit cliked id: ", id);
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const data = await res.json()
    setTasks(tasks.map((task) => task.id === id ? {...task, text: data.text, day: data.day, reminder: data.reminder } : task))
    // setTasks(
    //   tasks.map((task) =>
    //     task.id === id ? { ...task, text: text, day: day, reminder: reminder } : task
    //   )
    // );
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
                {tasks.length > 0 ? <Tasks
                  tasks={tasks}
                  onEdit={clickEditTask}
                  onDelete={showDeleteModal}
                  onDoubleClick={toggleReminder}
                /> : 'No Task.'}
                <p><Link to="About">About</Link></p>
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
