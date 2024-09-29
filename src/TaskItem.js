import React, { useState } from "react";

function TaskItem({ task, toggleComplete, removeTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEditChange = (e) => setEditText(e.target.value);

  const handleEditSave = () => {
    if (editText.trim()) {
      editTask(task.id, editText);
      setIsEditing(false);
    }
  };

  return (
    <li className={task.completed ? "task-item completed" : "task-item"}>
      {isEditing ? (
        <>z
          <input
            type="text"
            value={editText}
            onChange={handleEditChange}
            className="edit-input"
          />
          <button onClick={handleEditSave}>Salvar</button>
        </>
      ) : (
        <>
          <span onClick={() => toggleComplete(task.id)}>{task.text}</span>
          <div className="actions">
            <button onClick={() => setIsEditing(true)}>Editar</button>
            <button onClick={() => removeTask(task.id)}>Remover</button>
          </div>
        </>
      )}
    </li>
  );
}

export default TaskItem;
