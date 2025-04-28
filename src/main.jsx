import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import React from 'react'; // Import React for JSX fallback

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Root element with id 'root' not found. The application may not render correctly.");
  // Render a fallback UI if the root element is missing.
  document.body.innerHTML = '<div>Error: Root element not found. Please ensure a div with id="root" exists in your HTML.</div>';
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
    root.render(
      <div>Error loading application. Please try again later.</div>
    );
  }
}