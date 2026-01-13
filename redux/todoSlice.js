// redux/todoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    tasks: [
      {
        id: 1,
        description: 'Learn React Redux',
        isDone: true
      },
      {
        id: 2,
        description: 'Build ToDo App',
        isDone: false
      },
      {
        id: 3,
        description: 'Style the application',
        isDone: false
      },
      {
        id: 4,
        description: 'Test all features',
        isDone: false
      }
    ],
    filter: 'all' // all, done, notDone
  },
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        description: action.payload,
        isDone: false
      };
      state.tasks.push(newTask);
    },
    
    toggleTask: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.isDone = !task.isDone;
      }
    },
    
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    
    editTask: (state, action) => {
      const { id, description } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        task.description = description;
      }
    },
    
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    
    clearCompleted: (state) => {
      state.tasks = state.tasks.filter(task => !task.isDone);
    }
  }
});

export const { 
  addTask, 
  toggleTask, 
  deleteTask, 
  editTask, 
  setFilter,
  clearCompleted 
} = todoSlice.actions;

export const selectAllTasks = (state) => state.todos.tasks;
export const selectFilter = (state) => state.todos.filter;
export const selectFilteredTasks = (state) => {
  const tasks = state.todos.tasks;
  const filter = state.todos.filter;
  
  switch (filter) {
    case 'done':
      return tasks.filter(task => task.isDone);
    case 'notDone':
      return tasks.filter(task => !task.isDone);
    default:
      return tasks;
  }
};

export const selectStats = (state) => {
  const tasks = state.todos.tasks;
  const total = tasks.length;
  const completed = tasks.filter(task => task.isDone).length;
  const pending = total - completed;
  
  return { total, completed, pending };
};

export default todoSlice.reducer;
