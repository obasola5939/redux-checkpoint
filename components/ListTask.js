// components/Task.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTask, deleteTask, editTask } from '../redux/todoSlice';

const Task = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.description);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleToggle = () => {
    dispatch(toggleTask(task.id));
  };

  const handleEdit = () => {
    if (isEditing && editText.trim() !== '') {
      dispatch(editTask({ id: task.id, description: editText.trim() }));
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    if (editText.trim() !== '') {
      dispatch(editTask({ id: task.id, description: editText.trim() }));
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(task.description);
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    setShowDeleteConfirm(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={`task-item ${task.isDone ? 'completed' : ''}`}>
      <div className="task-checkbox">
        <input
          type="checkbox"
          checked={task.isDone}
          onChange={handleToggle}
          id={`task-${task.id}`}
        />
        <label htmlFor={`task-${task.id}`}>
          <div className="checkbox-custom">
            {task.isDone && <span className="checkmark">✓</span>}
          </div>
        </label>
      </div>
      
      <div className="task-content">
        {isEditing ? (
          <div className="edit-mode">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              className="edit-input"
            />
            <div className="edit-actions">
              <button onClick={handleSave} className="btn-save">
                💾 Save
              </button>
              <button onClick={handleCancel} className="btn-cancel">
                ❌ Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="view-mode">
            <div 
              className="task-description"
              onClick={() => !task.isDone && setIsEditing(true)}
            >
              {task.description}
            </div>
            <div className="task-meta">
              <span className="task-status">
                {task.isDone ? '✅ Completed' : '⏳ Pending'}
              </span>
              <span className="task-id">ID: {task.id}</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="task-actions">
        {!isEditing && (
          <>
            <button 
              onClick={() => setIsEditing(true)} 
              className="btn-edit"
              disabled={task.isDone}
              title={task.isDone ? "Cannot edit completed tasks" : "Edit task"}
            >
              ✏️
            </button>
            {showDeleteConfirm ? (
              <div className="delete-confirm">
                <span>Delete?</span>
                <button onClick={handleDelete} className="btn-confirm-yes">
                  Yes
                </button>
                <button 
                  onClick={() => setShowDeleteConfirm(false)} 
                  className="btn-confirm-no"
                >
                  No
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowDeleteConfirm(true)} 
                className="btn-delete"
              >
                🗑️
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Task;
