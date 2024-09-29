import React, { useState } from "react";

function TaskList({ tasks, setTasks, showCompleted }) {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editText, setEditText] = useState("");

  const toggleComplete = (id) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  const removeTask = (id) => {
    if (window.confirm("Você realmente deseja remover esta tarefa?")) {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.filter((task) => task.id !== id);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        return updatedTasks;
      });
    }
  };

  const startEditing = (id, text) => {
    setEditingTaskId(id);
    setEditText(text);
  };

  const saveTask = (id) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === id ? { ...task, text: editText } : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
    setEditingTaskId(null);
  };

  return (
    <ul className="task-list">
      {tasks
        .filter(task => (showCompleted ? task.completed : !task.completed)) // Filtra tarefas concluídas ou não
        .map((task) => (
          <li key={task.id} className={`task-item ${task.completed ? "completed" : ""}`}>
            {editingTaskId === task.id ? (
              <>
                <input
                  className="edit-input"
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => saveTask(task.id)} aria-label="Salvar tarefa">
                  💾 {/* Ícone de salvar */}
                </button>
              </>
            ) : (
              <>
                <span onClick={() => toggleComplete(task.id)}>
                  {task.completed ? "✔️ " : ""} {/* Check para tarefas concluídas */}
                  {task.text}
                </span>
                <div className="actions">
                  <button onClick={() => startEditing(task.id, task.text)} aria-label="Editar tarefa">
                    ✏️ {/* Ícone de editar */}
                  </button>
                  <button onClick={() => removeTask(task.id)} aria-label="Remover tarefa">
                    🗑️ {/* Ícone de lixeira */}
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
    </ul>
  );
}

export default TaskList;
