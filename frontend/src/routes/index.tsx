// React
import React from 'react';

// Router
import { Navigate } from 'react-router-dom';

// Pages
import Tasks from './Tasks/Tasks';
import Task from './Task/Task';
import Editor from './Editor/Editor';
import NotFound from './NotFound/NotFound';

export default [
  { index: true, element: <Navigate to="/tasks" /> },
  { path: '/tasks', element: <Tasks /> },
  { path: '/tasks/:id', element: <Task /> },
  { path: '/editor', element: <Editor /> },
  { path: '*', element: <NotFound /> }
];
