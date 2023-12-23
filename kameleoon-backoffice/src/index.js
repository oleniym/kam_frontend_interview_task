import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';

// node-sass, axios, classnames, react-router-dom, prop-types



import App from './App'; // из App.js ипортировали фукнцию

const root = ReactDOM.createRoot(document.getElementById('root')); // тут забираем что-то из дом дерева
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
