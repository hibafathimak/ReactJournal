import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import { EntriesProvider } from './contexts/EntriesContext'; // Adjust the import path as needed

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <EntriesProvider>
        <BrowserRouter>
        <App />
      </BrowserRouter>  
     </EntriesProvider>
    </StrictMode>,
)
