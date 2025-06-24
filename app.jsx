const App = () => {
  const [tasks, setTasks] = React.useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });
  const [input, setInput] = React.useState("");
  const [priority, setPriority] = React.useState("Medium");
  const [dueDate, setDueDate] = React.useState("");
  const [filter, setFilter] = React.useState("All");

  React.useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim()) {
      const newTask = {
        text: input,
        priority,
        dueDate,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setInput("");
      setPriority("Medium");
      setDueDate("");
    }
  };

  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    return task.priority === filter;
  });

  return (
    <div className="todo-app">
      <h1>📝 To-Do List</h1>
      <input
        type="text"
        value={input}
        placeholder="Enter a task"
        onChange={(e) => setInput(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>

      <div style={{ marginTop: "20px" }}>
        <label>Filter by Priority: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option>All</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>

      <ul>
        {filteredTasks.map((task, index) => (
          <li key={index} style={{ margin: "10px 0" }}>
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                marginRight: "10px",
              }}
            >
              {task.text} — <strong>{task.priority}</strong> — Due: {task.dueDate}
            </span>
            <button onClick={() => toggleComplete(index)}>
              {task.completed ? "Undo" : "Done"}
            </button>
            <button onClick={() => deleteTask(index)} style={{ marginLeft: "5px" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
