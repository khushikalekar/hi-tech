import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { EnquiryProvider } from '@/context/EnquiryContext';
import { AuthProvider } from '@/context/AuthContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <EnquiryProvider>
        <App />
      </EnquiryProvider>
    </AuthProvider>
  </StrictMode>
);
