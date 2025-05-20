import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LoggedContext from '../src/Components/loggedContext';
import { useContext } from 'react';
import UserContext from '../src/Components/userData';


function Register() {
    const { logged, setLogged } = useContext(LoggedContext);
    const { userFirstName, setUserFirstName } = useContext(UserContext);
    const { userLastName, setUserLastName } = useContext(UserContext);
    const { userEmail, setUserEmail } = useContext(UserContext);
    const { userGenres, setUserGenres } = useContext(UserContext);
    const navigate = useNavigate();
    const [userFirstname, setUserFirstname] = useState("");
    const [userLastname, setUserLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password1, setPassword1] = useState("");


    const submit = (event) => {
        event.preventDefault();
        if (checkNumber()) {
            console.log("made it through")
            if(password == password1) {
            setLogged(true);
            setUserFirstName(userFirstname);
            setUserLastName(userLastname);
            setUserEmail(email);
            setUserGenres(selectedGenres);
            navigate('/Genres');
            }else{
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
                    <input type="email" id="email" name="email" required onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password1">Reconfirm Password: </label>
                    <input type="password" id="password1" name="password1" required onChange={(e) => setPassword1(e.target.value)}/>
                </div>
                <button onClick={submit} type="submit">Register</button>
            </form>
            <div>
                <h1>select 5 genres you are intrested in</h1>
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
            </div>
        </div>

    )
}

export default Register