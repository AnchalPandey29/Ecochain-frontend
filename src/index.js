import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
    <App />
  </AuthProvider>,
  </React.StrictMode>
);

//8YLLZ4HHGH4FJX7P2M1ZQR3T twilio key