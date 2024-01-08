import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal'; // Corrected import statement
import App from './App.jsx';

const rootElement = document.getElementById('root');
Modal.setAppElement(rootElement);

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
