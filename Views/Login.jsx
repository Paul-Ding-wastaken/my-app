import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from '../src/firebase/index';
import { useContext } from "react";
import UserContext from "../src/Components/userData";
import LoggedContext from "../src/Components/loggedContext";
import { getDoc, doc } from "firebase/firestore";
import { db } from '../src/firebase/index';
function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user, setUser } = useContext(UserContext);
    const { setLogged } = useContext(LoggedContext);
    const { purchased, setPurchased } = useContext(UserContext);
    const { genres, setGenres } = useContext(UserContext);
    const { firstname, setFirstname } = useContext(UserContext);
    const { lastname, setLastname } = useContext(UserContext);

    async function handleLogin(event) {
        event.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                setLogged(true);
                getUserData(userCredential.user.uid).then((data) => {
                    setGenres(data.genres);
                    if (data.purchased) {
                        setPurchased(data.purchased);
                    } else {
                        setPurchased([]); // this is actually really bad practice, but it works for now.

                    }
                    userCredential.user.displayName = data.firstname + " " + data.lastname;
                    setUser(userCredential.user);
                    navigate("/genres");
                });
                
            });
        } catch (err) {
            setError("Failed to login. Please check your email and password.");
        }
    }

    async function handleGoogleLogin() {
        try {
            await signInWithPopup(auth, googleProvider).then((result) => {
                setLogged(true);
                setUser(result.user);

                getUserData(result.user.uid).then((data) => {
                    setGenres(data.genres);
                    if (data.purchased) {
                        setPurchased(data.purchased);
                    } else {
                        setPurchased([]);
                    }
                });

                navigate("/genres");
            });
        } catch (e) {
            setError("Google login failed.");

        }
    }

    async function getUserData(userId) {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        }
    }

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <button type="submit">Login</button>
            </form>

            <hr />

            <button onClick={handleGoogleLogin} style={{ marginTop: '1rem' }}>
                Login with Google
            </button>

            <p>
                Don't have an account? <Link to="/Register">Register here</Link>
            </p>
        </div>
    );
}

export default Login;
