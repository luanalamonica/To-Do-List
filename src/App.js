import React, { useState, useEffect, useCallback } from "react";
import TaskList from "./TaskList";
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);

  // Carrega as tarefas do localStorage quando o componente monta
  useEffect(() => {
    try {
      const savedTasks = JSON.parse(localStorage.getItem("tasks"));
      if (savedTasks) {
        setTasks(savedTasks);
      }
    } catch (error) {
      console.error("Erro ao carregar as tarefas do localStorage:", error);
      setTasks([]);
    }
  }, []);

  // Salva as tarefas no localStorage sempre que a lista de tasks é alterada
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = useCallback(() => {
    if (newTask.trim() === "") return;
    const newTaskObj = { id: Date.now(), text: newTask, completed: false };
    setTasks((prevTasks) => [...prevTasks, newTaskObj]);
    setNewTask("");
  }, [newTask]);

  const handleTaskChange = (e) => setNewTask(e.target.value);

  const toggleShowCompleted = () => {
    setShowCompleted((prev) => !prev);
  };

  return (
    <>
      <h2 className="main-title">Lista de Tarefas</h2>
      <div className="app">
        <div className="input-section">
          <input
            type="text"
            id="newTask"
            name="newTask"
            value={newTask}
            onChange={handleTaskChange}
            placeholder="Adicione uma nova tarefa"
          />
          <button onClick={addTask} aria-label="Adicionar tarefa">➕</button>
        </div>

        <button className="toggle-button" onClick={toggleShowCompleted} aria-label="Mostrar tarefas concluídas">
          {showCompleted ? "Mostrar Tarefas Pendentes" : "Mostrar Tarefas Concluídas"}
        </button>
        <TaskList tasks={tasks} setTasks={setTasks} showCompleted={showCompleted} />
      </div>
    </>
  );
}

export default App;
