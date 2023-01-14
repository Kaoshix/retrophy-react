import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import Raven from "raven-js";
import config from "./jsnesComponents/config";

if (config.SENTRY_URI) {
  Raven.config(config.SENTRY_URI).install();
}

Raven.context(function () {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
})
