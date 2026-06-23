import { FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";

function App() {
const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
});
useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);
  const [taskInput, setTaskInput] = useState("");

  const addTask = () => {
  if (!taskInput.trim()) return;

  setTasks([
    ...tasks,
    {
      text: taskInput,
      completed: false,
    },
  ]);

  setTaskInput("");
};

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };
  const toggleTask = (index) => {
  const updatedTasks = [...tasks];

  updatedTasks[index].completed =
    !updatedTasks[index].completed;

  setTasks(updatedTasks);
};
  const completedTasks = tasks.filter(
  (task) => task.completed
).length;
  <h3>Completed Tasks: {completedTasks}</h3>
  return (
    <div style={{ padding: "30px", maxWidth: "600px", margin: "auto" }}>
      <h1>🚀 Task Manager Pro</h1>

      <input
        type="text"
        placeholder="Enter a task"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        style={{ padding: "10px", width: "70%" }}
      />

      <button onClick={addTask} style={{ marginLeft: "10px" }}>
        Add Task
      </button>
      <h3>Total Tasks: {tasks.length}</h3>
      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            style={{
            textDecoration: task.completed ? "line-through" : "none",
  }}
>
  {task.text}
            <button
              onClick={() => deleteTask(index)}
              style={{ marginLeft: "10px" }}
            >
              <FaTrash /> Delete
            </button><button
              onClick={() => toggleTask(index)}
              style={{ marginLeft: "10px" }}
             >
             {task.completed ? "Undo" : "Complete"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;