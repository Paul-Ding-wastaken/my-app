import { createContext, useState, useEffect } from 'react';
import { useContext } from 'react';
import UserContext from './userData';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const { user } = useContext(UserContext);

  useEffect(() => { 
      if (user && cart.length > 0) {

      localStorage.setItem(user.uid + '_cart', JSON.stringify(cart));
    }
    
  }, [cart]);

  useEffect(() => {
    if (user) {
      const storedCart = JSON.parse(localStorage.getItem(user.uid + '_cart')) || [];
      setCart(storedCart);
    }
  }, [user]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext