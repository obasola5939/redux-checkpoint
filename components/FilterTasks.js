// components/FilterTasks.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, selectFilter } from '../redux/todoSlice';

const FilterTasks = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector(selectFilter);

  const filters = [
    { value: 'all', label: 'All Tasks', icon: '📋' },
    { value: 'notDone', label: 'Pending', icon: '⏳' },
    { value: 'done', label: 'Completed', icon: '✅' }
  ];

  return (
    <div className="filter-tasks">
      <div className="filter-header">
        <h3>🔍 Filter Tasks</h3>
        <div className="filter-info">
          <span className="current-filter">
            Current: {filters.find(f => f.value === currentFilter)?.label}
          </span>
        </div>
      </div>
      
      <div className="filter-buttons">
        {filters.map(filter => (
          <button
            key={filter.value}
            onClick={() => dispatch(setFilter(filter.value))}
            className={`filter-btn ${currentFilter === filter.value ? 'active' : ''}`}
          >
            <span className="filter-icon">{filter.icon}</span>
            <span className="filter-label">{filter.label}</span>
          </button>
        ))}
      </div>
      
      <div className="filter-stats">
        <div className="filter-stat-item">
          <span className="stat-label">Filter applied:</span>
          <span className="stat-value">{currentFilter}</span>
        </div>
        <div className="filter-stat-item">
          <span className="stat-label">Tasks visible:</span>
          <span className="stat-value">Based on filter</span>
        </div>
      </div>
    </div>
  );
};

export default FilterTasks;
