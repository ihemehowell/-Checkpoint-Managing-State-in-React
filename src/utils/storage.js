export const saveTasks = (tasks) => {
  try {
    console.log("Saving tasks:", tasks); // ✅ debug
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (e) {
    console.error("Failed to save tasks", e);
  }
};

export const loadTasks = () => {
  try {
    const stored = localStorage.getItem("tasks");
    console.log("Loaded from storage:", stored); // ✅ debug
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Failed to load tasks", e);
    return [];
  }
};