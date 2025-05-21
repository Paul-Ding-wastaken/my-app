import './Cart.css';
import Header from '../src/Components/Header';
import CartContext from '../src/Components/cartContext';
import { useContext } from 'react';
import MovieBlock from '../src/Components/MovieBlock';


function Cart() {
    const { cart, setCart } = useContext(CartContext);
    let originalCart = cart;

    return (
        <>
            <Header />
            <h1>Your Cart</h1>
            <div className="page-container">
                <h1>Your Cart{originalCart[0] ? (""): <>, looking empty. <br />Go find some movies!</>}</h1>
                <div className="content">
                    <div className="movies-grid">
                        {originalCart.slice(0, originalCart.length).map((movie) => (
                            <MovieBlock
                                key={movie.id}
                                poster_path={movie.poster_path}
                                id={movie.id}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart