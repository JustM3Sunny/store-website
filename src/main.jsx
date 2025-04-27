import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Root element with id 'root' not found. The application may not render correctly.");
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
    // Optionally render a fallback UI here, e.g., a simple error message.
    // root.render(<div>Error loading application.</div>);
  }
}