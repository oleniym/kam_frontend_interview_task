import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.scss';

import App from './App'; // из App.js ипортировали фукнцию

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);