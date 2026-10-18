import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { ThemeProvider } from './context/ThemeContext';
import { AudioProvider } from './context/AudioContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <AudioProvider>
          <App />
        </AudioProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
