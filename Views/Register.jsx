import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LoggedContext from '../src/Components/loggedContext';
import { useContext } from 'react';
import UserContext from '../src/Components/userData';
import { auth, googleProvider } from '../src/firebase/index';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../src/firebase/index';




function Register() {
    const { logged, setLogged } = useContext(LoggedContext);
    const { user, setUser } = useContext(UserContext);
    const { genres, setGenres } = useContext(UserContext);
    const navigate = useNavigate();
    let genrelist = [];
    const [userFirstname, setUserFirstname] = useState("");
    const [userLastname, setUserLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password1, setPassword1] = useState("");
    const [curgenre, setCurgenre] = useState(28);
    const loginWithGoogle = async () => {
        if (checkNumber()) {
            try {
                const result = await signInWithPopup(auth, googleProvider);
                setUser(result.user);
                setGenres(selectedGenres);
                if (userCredential.user.displayName) {
                    setUserFirstname(result.user.displayName.split(" ")[0] || "");
                    setUserLastname(result.user.displayName.split(" ")[1] || "");
                }
                setEmail(result.user.email || "");
                setLogged(true);
                saveUser(result.user.uid);
                navigate('/genres');

            } catch (error) {
                console.error("Google Sign-in error:", error.message);
                alert("Google sign-in failed: " + error.message);
            }
        }
    };


    const submit = async (event) => {
        event.preventDefault();
        if (checkNumber()) {

            if (password == password1) {
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        userCredential.user.displayName = userFirstname + " " + userLastname;
                        setUser(userCredential.user);
                        setLogged(true);
                        setGenres(selectedGenres);
                        saveUser(userCredential.user.uid)
                        navigate('/genres');
                    })
                    .catch((error) => {
                        console.log(error)
                    });

            } else {
                alert("passwords do not match");
            }
        }
    }

    const [selectedGenres, setSelectedGenres] = useState(Array(12).fill(false));

    function handleCheckboxChange(x) {
        const originalGenres = [...selectedGenres];
        originalGenres[x.target.value - 1] = x.target.checked;
        setSelectedGenres(originalGenres);
    }

    function setstuff(x) {
        setCurgenre(x);

    }

    function checkNumber() {

        let selectedGenresCount = 0;
        for (let i = 0; i < selectedGenres.length; i++) {
            if (selectedGenres[i] == true) {
                selectedGenresCount++;
            }
        }
        if (selectedGenresCount < 5) {
            console.log("here")
            alert("You must select at least 5 genres");
            return false;
        } else {
            return true;
        }
    }

    async function saveUser(userId) {
        await setDoc(doc(db, "users", userId), {
            firstname: userFirstname,
            lastname: userLastname,
            email: email,
            genres: selectedGenres,
            purchased: []
        }).then(() => {
            console.log("User data saved successfully");
        }).catch((error) => {
            console.error("Error saving user data:", error);
        });
    }

    return (
        <div className="register-container">
            <h1>Register</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="userFirstname">Username: </label>
                    <input type="text" id="userFirstname" name="userFirstname" required onChange={(e) => setUserFirstname(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="userLastname">Username: </label>
                    <input type="text" id="userLastname" name="userLastname" required onChange={(e) => setUserLastname(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email: </label>
                    <input type="email" id="email" name="email" required onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password1">Reconfirm Password: </label>
                    <input type="password" id="password1" name="password1" required onChange={(e) => setPassword1(e.target.value)} />
                </div>
                <button onClick={submit} type="submit">Register</button>
            </form>
            <div>
                <h1>select 5 genres you are intrested in</h1>
                <li>
                    <input type="checkbox" id="action" name="action" value="1" onChange={(e) => { handleCheckboxChange(e); setstuff(28) }} />
                    <label htmlFor="action">Action</label>

                    <input type="checkbox" id="adventure" name="adventure" value="2" onChange={(e) => { handleCheckboxChange(e); setstuff(12) }} />
                    <label htmlFor="adventure">Adventure</label>

                    <input type="checkbox" id="animation" name="animation" value="3" onChange={(e) => { handleCheckboxChange(e); setstuff(16) }} />
                    <label htmlFor="animation">Animation</label>

                    <input type="checkbox" id="crime" name="crime" value="4" onChange={(e) => { handleCheckboxChange(e); setstuff(80) }} />
                    <label htmlFor="crime">Crime</label>

                    <input type="checkbox" id="family" name="family" value="5" onChange={(e) => { handleCheckboxChange(e); setstuff(10751) }} />
                    <label htmlFor="family">Family</label>

                    <input type="checkbox" id="fantasy" name="fantasy" value="6" onChange={(e) => { handleCheckboxChange(e); setstuff(14) }} />
                    <label htmlFor="fantasy">Fantasy</label>

                    <input type="checkbox" id="history" name="history" value="7" onChange={(e) => { handleCheckboxChange(e); setstuff(36) }} />
                    <label htmlFor="history">History</label>

                    <input type="checkbox" id="horror" name="horror" value="8" onChange={(e) => { handleCheckboxChange(e); setstuff(27) }} />
                    <label htmlFor="horror">Horror</label>

                    <input type="checkbox" id="mystery" name="mystery" value="9" onChange={(e) => { handleCheckboxChange(e); setstuff(9648) }} />
                    <label htmlFor="mystery">Mystery</label>

                    <input type="checkbox" id="scifi" name="scifi" value="10" onChange={(e) => { handleCheckboxChange(e); setstuff(878) }} />
                    <label htmlFor="scifi">Sci-Fi</label>

                    <input type="checkbox" id="war" name="war" value="11" onChange={(e) => { handleCheckboxChange(e); setstuff(10752) }} />
                    <label htmlFor="war">War</label>

                    <input type="checkbox" id="western" name="western" value="12" onChange={(e) => { handleCheckboxChange(e); setstuff(37) }} />
                    <label htmlFor="western">Western</label>

                </li>
            </div>
            <div>
                <h1>Register with Google:</h1>
                <button onClick={loginWithGoogle}>Login with Google</button>
            </div>

        </div>

    )
}

export default Register