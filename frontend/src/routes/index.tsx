// React
import React from 'react';

// Router
import { Navigate } from 'react-router-dom';

// Pages
import Tasks from './Tasks/Tasks';
import Task from './Task/Task';
import CreateTask from './CreateTask/CreateTask';
import EditTask from './EditTask/EditTask';
import NotFound from './NotFound/NotFound';

export default [
  { index: true, element: <Navigate to="/tasks" /> },
  { path: '/tasks', element: <Tasks /> },
  { path: '/tasks/:id', element: <Task /> },
  { path: '/tasks/:id/edit', element: <EditTask /> },
  { path: '/editor', element: <CreateTask /> },
  { path: '*', element: <NotFound /> }
];
