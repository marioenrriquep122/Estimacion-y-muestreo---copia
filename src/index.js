import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App';
// este es el archivo inica la aplicacion en react que carga el component app.js
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
