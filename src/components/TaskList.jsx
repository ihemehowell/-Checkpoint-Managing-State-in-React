import { TaskItem } from ".";

function TaskList({ tasks, updateTask, deleteTask }) {
  if (tasks.length === 0) {
    return <p>No tasks yet</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;
