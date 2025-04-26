import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App'; // Corrected file extension and simplified import

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Root element with id 'root' not found.  The application may not render correctly.");
} else {
  const root = createRoot(rootElement);

  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}