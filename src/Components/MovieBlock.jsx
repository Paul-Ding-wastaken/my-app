import React, { useEffect, useState } from 'react';
import './MovieBlock.css';
import { Link } from 'react-router-dom';
import LoggedContext from './loggedContext';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import CartContext from './cartContext';


function MovieBlock(x) {
  const { logged, setLogged } = useContext(LoggedContext);
  const [imageUrl, setImageUrl] = useState(null);
  const { cart, setCart } = useContext(CartContext);
  const [originalCart, setOriginalCart] = useState(cart);
  const location = useLocation()
  console.log(location.pathname)


  function handleAddToCart() {
    if (!cart.find((item) => item.id === x.id)) {
      const updatedCart = [...cart, { id: x.id, poster_path: x.poster_path, title: x.title }];
      setCart(updatedCart);
    }
  }

  function handleRemoveFromCart() {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === x.id) {
        const updatedCart = [...cart];
        updatedCart.splice(i, 1);
        setCart(updatedCart);
        break;
      }
    }
  }


  useEffect(() => {
    if (x.poster_path) {
      const url = `https://image.tmdb.org/t/p/w500${x.poster_path}`;
      setImageUrl(url);
    }
  }, [x.poster_path]);

  return (
    <>
      {logged == true ? (
        <Link className="movie-block" to={`/Details/${x.id}`} style={{ textDecoration: 'none' }}>
          <img src={imageUrl} style={{ cursor: 'pointer' }} />
        </Link>
      ) : (
        <Link className="movie-block" to='/Login' style={{ textDecoration: 'none' }}>
          <img src={imageUrl} style={{ cursor: 'pointer' }} />
        </Link>
      )}
      {location.pathname === '/Genres' || location.pathname === '/' ? (
        <button onClick={handleAddToCart}>Add to Cart</button>
      ) : location.pathname === '/Cart' ? (
        <button onClick={handleRemoveFromCart}>Remove from Cart</button>
      ) : null}

    </>
  );
}

export default MovieBlock;
