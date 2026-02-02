
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Critical rendering error:", error);
    rootElement.innerHTML = `<div style="color:red; padding: 20px; font-family: monospace;">Execution Error: ${error.message}</div>`;
  }
} else {
  console.error("Root element not found");
}
