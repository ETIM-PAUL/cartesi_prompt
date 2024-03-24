import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ContentProvider from './contentContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContentProvider>
      <App />
    </ContentProvider>
  </React.StrictMode>
);
