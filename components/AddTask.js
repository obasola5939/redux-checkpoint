// components/AddTask.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/todoSlice';

const AddTask = () => {
  const dispatch = useDispatch();
  const [taskText, setTaskText] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const trimmedText = taskText.trim();
    
    if (!trimmedText) {
      setError('Task description cannot be empty');
      return;
    }
    
    if (trimmedText.length < 3) {
      setError('Task must be at least 3 characters long');
      return;
    }
    
    if (trimmedText.length > 200) {
      setError('Task cannot exceed 200 characters');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    // Simulate API call delay
    setTimeout(() => {
      dispatch(addTask(trimmedText));
      setTaskText('');
      setIsSubmitting(false);
      
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'success-message';
      successMsg.textContent = '✅ Task added successfully!';
      document.querySelector('.add-task-form').appendChild(successMsg);
      setTimeout(() => {
        if (successMsg.parentNode) {
          successMsg.parentNode.removeChild(successMsg);
        }
      }, 2000);
    }, 300);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  const handleChange = (e) => {
    setTaskText(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="add-task">
      <form onSubmit={handleSubmit} className="add-task-form">
        <div className="form-group">
          <label htmlFor="taskInput" className="form-label">
            What needs to be done?
          </label>
          <div className="input-with-button">
            <input
              id="taskInput"
              type="text"
              value={taskText}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter your task here..."
              className={`task-input ${error ? 'error' : ''}`}
              disabled={isSubmitting}
              autoComplete="off"
            />
            <button 
              type="submit" 
              className="add-btn"
              disabled={isSubmitting || !taskText.trim()}
            >
              {isSubmitting ? (
                <span className="spinner">⏳</span>
              ) : (
                '➕ Add'
              )}
            </button>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="input-hints">
            <div className="hint">
              <span className="hint-icon">💡</span>
              Press Enter to add quickly
            </div>
            <div className="character-count">
              {taskText.length}/200
            </div>
          </div>
        </div>
        
        <div className="quick-tasks">
          <h4>Quick Add:</h4>
          <div className="quick-task-buttons">
            <button 
              type="button" 
              className="quick-task-btn"
              onClick={() => setTaskText('Review project requirements')}
            >
              Review project
            </button>
            <button 
              type="button" 
              className="quick-task-btn"
              onClick={() => setTaskText('Follow up with team')}
            >
              Team follow-up
            </button>
            <button 
              type="button" 
              className="quick-task-btn"
              onClick={() => setTaskText('Schedule meeting')}
            >
              Schedule meeting
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
