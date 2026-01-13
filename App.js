// App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import AddTask from './components/AddTask';
import ListTask from './components/ListTask';
import FilterTasks from './components/FilterTasks';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="container">
          <header className="app-header">
            <h1>📝 Redux ToDo</h1>
            <p className="subtitle">Manage your tasks with Redux state management</p>
          </header>
          
          <div className="app-content">
            <div className="left-panel">
              <div className="card">
                <h2>➕ Add New Task</h2>
                <AddTask />
              </div>
              
              <div className="card">
                <h2>🎯 Task Statistics</h2>
                <div className="stats-container">
                  <div className="stat-item">
                    <div className="stat-icon">📋</div>
                    <div className="stat-info">
                      <span className="stat-label">Total Tasks</span>
                      <span className="stat-value total">0</span>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-icon">✅</div>
                    <div className="stat-info">
                      <span className="stat-label">Completed</span>
                      <span className="stat-value completed">0</span>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-icon">⏳</div>
                    <div className="stat-info">
                      <span className="stat-label">Pending</span>
                      <span className="stat-value pending">0</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card">
                <h2>⚡ Quick Actions</h2>
                <div className="quick-actions">
                  <button className="action-btn clear-btn">
                    🗑️ Clear Completed
                  </button>
                  <button className="action-btn mark-all-btn">
                    ✅ Mark All Complete
                  </button>
                </div>
              </div>
            </div>
            
            <div className="right-panel">
              <div className="card main-card">
                <div className="card-header">
                  <h2>📋 Task List</h2>
                  <FilterTasks />
                </div>
                <ListTask />
              </div>
            </div>
          </div>
          
          <footer className="app-footer">
            <p>Redux ToDo App • Built with React & Redux Toolkit</p>
            <p className="hint">💡 Tasks are stored in Redux global state</p>
          </footer>
        </div>
      </div>
    </Provider>
  );
}

export default App;
