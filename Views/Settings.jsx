import { useState } from "react";
import { useContext } from "react";
import UserContext from '../src/Components/userData';

function Settings() {
    const { userFirstName, setUserFirstName } = useContext(UserContext);
    const { userLastName, setUserLastName } = useContext(UserContext);
    const { userEmail, setUserEmail } = useContext(UserContext);
    const { userGenres, setUserGenres } = useContext(UserContext);
    const [ firstName, setFirstName] = useState("");
    const [ lastName, setLastName] = useState("");
    const [ genres, setGenres ] = useState(Array(12).fill(false));

    function handleCheckboxChange(x) {
        const originalGenres = [...genres];
        originalGenres[x.target.value - 1] = x.target.checked;
        console.log(originalGenres)
        setGenres(originalGenres);
    }

    function handleSubmit() {
        if(checkGenres()){
            setUserFirstName(firstName);
            setUserLastName(lastName);
            setUserGenres(genres);
        }

    }

    function checkGenres() {
        let selectedGenresCount = 0;
        console.log(genres)
        for (let i = 0; i < genres.length; i++) {
            if (genres[i] == true) {
                selectedGenresCount++;
            }
        }
        if (selectedGenresCount < 5) {
            alert("You must select at least 5 genres");
            return false;
        } else {
            return true;
        }
    }


    return (
        <>
            <h1>Settings</h1>
            <p>Hello, {userFirstName} {userLastName}!</p>
            <p>First Name:</p>
            <input type="text" required onChange={(e) => setFirstName(e.target.value)} />
            <p>Last Name:</p>
            <input type="text" onChange={(e) => setLastName(e.target.value)} />
            <p>Email:</p>
            <input type="email" value={userEmail} disabled />
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
        </>

    )

}

export default Settings