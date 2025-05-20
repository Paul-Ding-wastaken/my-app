import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import { LoggedProvider } from './Components/loggedContext';
import { CartProvider } from './Components/cartContext';
import { UserProvider } from './Components/userData.jsx';


globalThis.Logged = false;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoggedProvider>
      <CartProvider>
        <BrowserRouter>
          <UserProvider>
            <App />
          </UserProvider>
        </BrowserRouter>
      </CartProvider>
    </LoggedProvider>
  </StrictMode>,
)
