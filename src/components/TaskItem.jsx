import { useState } from "react";

function TaskItem({ task, updateTask, deleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(task.name);
  const [desc, setDesc] = useState(task.desc);
  const [dueDate, setDueDate] = useState(task.dueDate || "");

  const toggleComplete = () => {
    updateTask(task.id, { ...task, completed: !task.completed });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    if (!name || !desc) {
      alert("Please fill in all fields!");
      return;
    }
    updateTask(task.id, { ...task, name, desc, dueDate });
    setIsEditing(false);
  };

  return (
    <li className={`task-item ${task.completed ? "completed" : ""} priority-${task.priority}`}>
  {isEditing ? (
    <form onSubmit={handleEdit} className="edit-form">
  <input
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder="Task name"
  />
  
  <input
    type="text"
    value={desc}
    onChange={(e) => setDesc(e.target.value)}
    placeholder="Task description"
  />

  {/* Due Date */}
  <input
    type="date"
    value={task.dueDate || ""}
    onChange={(e) => updateTask(task.id, { ...task, dueDate: e.target.value })}
  />

  {/* Priority Dropdown */}
  <select
    value={task.priority || "medium"}
    onChange={(e) => updateTask(task.id, { ...task, priority: e.target.value })}
  >
    <option value="high">High</option>
    <option value="medium">Medium</option>
    <option value="low">Low</option>
  </select>

  <button type="submit">Save</button>
  <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
</form>
  ) : (
    <>
      <div className="task-info">
        <h3>{task.name}</h3>
        <p>{task.desc}</p>
        <p><strong>Due:</strong> {task.dueDate || "No deadline"}</p>
        <p><strong>Priority:</strong> {task.priority}</p>
      </div>
      <div className="task-actions">
        <button onClick={toggleComplete}>
          {task.completed ? "Undo" : "Complete"}
        </button>
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={() => deleteTask(task.id)}>Delete</button>
      </div>
    </>
  )}
</li>

  );
}

export default TaskItem;
