import React from 'react';
import ReactDOM from 'react-dom/client';

import 'antd/dist/antd.css';
import './index.css';

import { Editor } from './components/Editor';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Editor />
  </React.StrictMode>,
);
