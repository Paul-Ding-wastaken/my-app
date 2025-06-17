import { useState } from "react";
import { useContext } from "react";
import UserContext from '../src/Components/userData';
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from '../src/firebase/index';
import { useNavigate } from "react-router-dom";
import { getAuth, updatePassword } from 'firebase/auth';
import MovieBlock from '../src/Components/MovieBlock';

function Settings() {
    const { userGenres, setUserGenres } = useContext(UserContext);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const auth = getAuth();
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [genres, setGenres] = useState(Array(12).fill(false));
    const { purchased, setPurchased } = useContext(UserContext);
    const [newPassword, setNewPassword] = useState("");
    let tasks = {};

    function handleCheckboxChange(x) {
        const originalGenres = [...genres];
        originalGenres[x.target.value - 1] = x.target.checked;
        console.log(originalGenres)
        setGenres(originalGenres);
    }


    async function handleSubmit() {
        if (checkGenres()) {
            tasks.genres = genres;
        }
        if (firstName && firstName.length > 0) {
            tasks.firstname = firstName;
        }
        if (lastName && lastName.length > 0) {
            tasks.lastname = lastName;
        }
        user.displayName = (firstName && firstName.length > 0 ? firstName : user.displayName.split(" ")[0] || "") + " " + (lastName && lastName.length > 0 ? lastName : user.displayName.split(" ")[1] || "");
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        await updateDoc(userRef, tasks);
        if (newPassword) {
            if (newPassword.length > 5) {
                try {
                    await updatePassword(auth.currentUser, newPassword);
                } catch (error) {
                    console.error("Password update failed:", error.code, error.message);
                    navigate('/genres');
                    alert("Error updating password. Please try again later. Any other changes have been saved.");
                }
            }
        }
        navigate('/genres');
        alert("User info updated!");
    }





    function checkGenres() {
        let selectedGenresCount = 0;
        for (let i = 0; i < genres.length; i++) {
            if (genres[i] == true) {
                selectedGenresCount++;
            }
        }
        if (selectedGenresCount < 5) {
            if(selectedGenresCount > 0) {
            alert("You must select at least 5 genres");
            }
            return false;
        } else {
            return true;
        }
    }


    return (
        <>
            <h1>Settings</h1>
            <p>First Name:</p>
            <input type="text" required onChange={(e) => setFirstName(e.target.value)} />
            <p>Last Name:</p>
            <input type="text" onChange={(e) => setLastName(e.target.value)} />
            <p>Email:</p>
            <input type="email" value={user.email} disabled />
            <p>Password:</p>
            <input type="password" placeholder="Change password" onChange={(e) => setNewPassword(e.target.value)} />
            <p>Genres:</p>
            <li>
                <input type="checkbox" id="action" name="action" value="1" onChange={handleCheckboxChange} />
                <label htmlFor="action">Action</label>

                <input type="checkbox" id="adventure" name="adventure" value="2" onChange={handleCheckboxChange} />
                <label htmlFor="adventure">Adventure</label>

                <input type="checkbox" id="animation" name="animation" value="3" onChange={handleCheckboxChange} />
                <label htmlFor="animation">Animation</label>

                <input type="checkbox" id="crime" name="crime" value="4" onChange={handleCheckboxChange} />
                <label htmlFor="crime">Crime</label>

                <input type="checkbox" id="family" name="family" value="5" onChange={handleCheckboxChange} />
                <label htmlFor="family">Family</label>

                <input type="checkbox" id="fantasy" name="fantasy" value="6" onChange={handleCheckboxChange} />
                <label htmlFor="fantasy">Fantasy</label>

                <input type="checkbox" id="history" name="history" value="7" onChange={handleCheckboxChange} />
                <label htmlFor="history">History</label>

                <input type="checkbox" id="horror" name="horror" value="8" onChange={handleCheckboxChange} />
                <label htmlFor="horror">Horror</label>

                <input type="checkbox" id="mystery" name="mystery" value="9" onChange={handleCheckboxChange} />
                <label htmlFor="mystery">Mystery</label>

                <input type="checkbox" id="scifi" name="scifi" value="10" onChange={handleCheckboxChange} />
                <label htmlFor="scifi">Sci-Fi</label>

                <input type="checkbox" id="war" name="war" value="11" onChange={handleCheckboxChange} />
                <label htmlFor="war">War</label>

                <input type="checkbox" id="western" name="western" value="12" onChange={handleCheckboxChange} />
                <label htmlFor="western">Western</label>
            </li>
            <button onClick={handleSubmit}>Save Changes</button>
            <br></br>
            <h>Purchased movies</h>
            <div className="movies-grid">
                {purchased && purchased.slice(0, purchased.length).map((movie) => (
                    <MovieBlock
                        key={movie.id}
                        poster_path={movie.poster_path}
                        id={movie.id}
                    />
                ))}
            </div>

        </>

    )

}

export default Settings