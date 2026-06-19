import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  const addTask = () => {
    if (taskInput.trim() === "") return;

    setTasks([...tasks, taskInput]);
    setTaskInput("");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>🚀 Task Manager Pro</h1>

      <input
        type="text"
        placeholder="Enter a task"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
      />

      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;