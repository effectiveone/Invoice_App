import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element not found');
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  container,
);
