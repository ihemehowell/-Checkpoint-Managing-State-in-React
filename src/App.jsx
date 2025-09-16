// App.jsx
import { useState, useEffect } from "react";
import { TaskForm, TaskList } from "./components";
import { saveTasks, loadTasks } from "./utils/storage";
import "./index.css";

function App() {
  // Load from storage on first render
  const [tasks, setTasks] = useState(() => loadTasks());
  const [filter, setFilter] = useState("all");

  // Save tasks whenever they change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // Add a new task
  const addTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  // Update task
  const updateTask = (id, updatedTask) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));
  };

  // Delete task
  const deleteTask = (id) => {
    if (confirm("Are you sure you want to delete this task?")) {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    }
  };

  // Filter
  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "active") return !t.completed;
    return true;
  });

// Priority + Due Date Sorting
const priorityOrder = { high: 1, medium: 2, low: 3 };

const sortedTasks = [...filteredTasks].sort((a, b) => {
  // Compare priority first
  if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  }

  // Then compare due date
  if (!a.dueDate) return 1;  // tasks without date go last
  if (!b.dueDate) return -1;
  return new Date(a.dueDate) - new Date(b.dueDate);
});

  return (
    <div className="app">
      <h1>React To-Do List</h1>
      <TaskForm addTask={addTask} />
      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>
      <TaskList
        tasks={sortedTasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
