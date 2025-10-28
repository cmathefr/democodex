import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { PegaProvider } from 'pega-react-sdk';
import { pegaConfig } from './config.js';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PegaProvider config={pegaConfig}>
      <App />
    </PegaProvider>
  </React.StrictMode>
);
