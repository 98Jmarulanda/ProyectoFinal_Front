import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// import { RegistroUsuario } from './components/RegistroUsuario.jsx'
// import { FormUsuario } from './components/FormUsuario.jsx'
import { LoginRegister } from './components/LoginRegister/LoginRegister.jsx'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
