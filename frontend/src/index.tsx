import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from './store';

import 'antd/dist/antd.css';
import './index.css';

import { Editor } from './components/Editor';
import { Tasks } from './components/Tasks';
import { Task } from './components/Tasks/components';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Tasks />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/task/:id" element={<Task />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
