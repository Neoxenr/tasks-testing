// React
import React from 'react';

// DOM
import ReactDOM from 'react-dom/client';

// Router
import { BrowserRouter } from 'react-router-dom';

// Components
import App from 'App';

// SCSS
import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
