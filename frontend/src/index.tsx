import '@fontsource/roboto';

import React from 'react';
import ReactDOM from 'react-dom/client';

import 'antd/dist/antd.css';
import './index.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CheckoutForm } from './components/Form';
import { Result } from './components';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CheckoutForm />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
