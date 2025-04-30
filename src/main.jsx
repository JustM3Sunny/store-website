import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Root element with id 'root' not found. The application may not render correctly.");
  // Render a fallback UI if the root element is missing.
  const fallbackElement = document.createElement('div');
  fallbackElement.textContent = 'Error: Root element not found. Please ensure a div with id=\"root\" exists in your HTML.';
  document.body.appendChild(fallbackElement);
} else {
  try {
    const root = createRoot(rootElement);

    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } catch (error) {
    console.error("An error occurred during React rendering:", error);
    // Render a fallback UI in case of rendering errors.
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <div>Error loading application. Please try again later.</div>
      </StrictMode>
    );
  }
}