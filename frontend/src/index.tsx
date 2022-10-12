import React from 'react';
import ReactDOM from 'react-dom/client';

import 'antd/dist/antd.css';
import './index.css';

import { Provider } from 'react-redux';

import { Editor } from './components/Editor';
import { Tasks } from './components/Tasks';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Editor />
      <Tasks />
    </Provider>
  </React.StrictMode>,
);
