import { FaTrash, FaCheckCircle, FaCircle, FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import "./App.css";

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
        id: Date.now(),
        text: taskInput,
        completed: false,
        createdAt: new Date().toLocaleDateString(),
      },
    ]);

    setTaskInput("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const completedTasks = tasks.filter((task) => task.completed).length;
  const completionPercentage = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Task Manager Pro</h1>
          <p className="app-subtitle">Organize your tasks efficiently</p>
        </div>
      </header>

      <main className="app-main">
        <div className="input-section">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="What needs to be done today?"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="task-input"
            />
            <button onClick={addTask} className="btn-add">
              <FaPlus /> Add Task
            </button>
          </div>
        </div>

        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-value">{tasks.length}</div>
            <div className="stat-label">Total Tasks</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{completedTasks}</div>
            <div className="stat-label">Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{completionPercentage}%</div>
            <div className="stat-label">Progress</div>
          </div>
        </div>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${completionPercentage}%` }}></div>
        </div>

        <div className="tasks-section">
          {tasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3>No tasks yet</h3>
              <p>Add a task above to get started!</p>
            </div>
          ) : (
            <ul className="tasks-list">
              {tasks.map((task) => (
                <li key={task.id} className={`task-item ${task.completed ? "completed" : ""}`}>
                  <button
                    className="task-checkbox"
                    onClick={() => toggleTask(task.id)}
                  >
                    {task.completed ? <FaCheckCircle /> : <FaCircle />}
                  </button>
                  <div className="task-content">
                    <p className="task-text">{task.text}</p>
                    <span className="task-date">{task.createdAt}</span>
                  </div>
                  <button
                    className="btn-delete"
                    onClick={() => deleteTask(task.id)}
                    title="Delete task"
                  >
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
