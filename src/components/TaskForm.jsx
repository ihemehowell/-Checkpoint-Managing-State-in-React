import { useState } from "react";

function TaskForm({ addTask }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !desc) {
      alert("Please fill in both name and description!");
      return;
    }

    const newTask = {
      id: Date.now(), // unique id
      name,
      desc,
      dueDate,
      priority,
      completed: false,
    };

    addTask(newTask);
    setName("");
    setDesc("");
    setDueDate("");
    setPriority("medium");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Add New Task</h2>

      <input
        type="text"
        placeholder="Task name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      ></textarea>

      <div className="form-row">
        <label>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div className="form-row">
        <label>Priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="high"> High</option>
          <option value="medium"> Medium</option>
          <option value="low"> Low</option>
        </select>
      </div>

      <button type="submit">+ Add Task</button>
    </form>
  );
}

export default TaskForm;
