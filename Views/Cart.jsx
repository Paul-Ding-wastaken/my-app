import './Cart.css';
import Header from '../src/Components/Header';
import CartContext from '../src/Components/cartContext';
import { useContext } from 'react';
import MovieBlock from '../src/Components/MovieBlock';
import { db } from '../src/firebase/index';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import UserContext from '../src/Components/userData';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const { cart, setCart } = useContext(CartContext);
    const { user } = useContext(UserContext);
    const { purchased, setPurchased } = useContext(UserContext);
    let originalCart = cart;
    const navigate = useNavigate();

    async function handlePurchase() {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        await updateDoc(userRef, {
            purchased: originalCart.concat(userDoc.data().purchased || [])
        });
        setPurchased(originalCart.concat(purchased || []));
        setCart([]);
        navigate('/genres');
        alert("Purchase successful! Your movies have been added to your collection.");
    }

    return (
        <>
            <Header />
            <h1>Your Cart</h1>
            <div className="page-container">
                <h1>Your Cart{originalCart ? ("") : <>, looking empty. <br />Go find some movies!</>}</h1>
                <div className="content">
                    <div className="movies-grid">
                        {originalCart && originalCart.slice(0, originalCart.length).map((movie) => (
                            <MovieBlock
                                key={movie.id}
                                poster_path={movie.poster_path}
                                id={movie.id}
                            />
                        ))}
                    </div>
                </div>
                <button onClick={handlePurchase}>purchase stuff.</button>
            </div>
        </>
    )
}

export default Cart