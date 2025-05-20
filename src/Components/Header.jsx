import { Link } from "react-router-dom";
import './Header.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoggedContext from "./loggedContext";
import { useContext } from "react";
import axios from "axios";


function Header() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const s1 = document.querySelector('.s1');
    const s2 = document.querySelector('.s2');
    const s3 = document.querySelector('.s3');
    const s4 = document.querySelector('.s4');
    const s5 = document.querySelector('.s5');

    function chill(func, delay) {
        let x;
        return function (...args) {
            clearTimeout(x);
            x = setTimeout(() => func.apply(this, args), delay);
        };
    }

    const searching = chill((e) => {
        let temp = e.target.value;
        let temp2 = "";
        for (let i = 0; i < temp.length; i++) {
            if (temp.charAt(i) == " ") {
                temp2 += "+";
            } else {
                temp2 += temp.charAt(i);
            }
        }
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_API_KEY}&query=${temp2}`)
            .then((response) => {
                setSearch(response.data.results);
                handleChange(response.data.results);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, 400)

    function handleChange(x) {
        if (x[0]) {
            s1.style.opacity = 1;
            s1.disabled = false;
            s1.style.pointerEvents = 'auto';
            s1.innerHTML = x[0].title;
            s1.onclick = () => {
                navigate(`/Details/${x[0].id}`);
            }
        } else {
            s1.style.opacity = 0;
            s1.disabled = true;
            s1.style.pointerEvents = 'none';
        }
        if (x[1]) {
            s2.style.opacity = 1;
            s2.disabled = false;
            s2.style.pointerEvents = 'auto';
            s2.innerHTML = x[1].title;
            s2.onclick = () => {
                navigate(`/Details/${x[1].id}`);
            }
        } else {
            s2.style.opacity = 0;
            s2.disabled = true;
            s2.style.pointerEvents = 'none';
        }
        if (x[2]) {
            s3.style.opacity = 1;
            s3.disabled = false;
            s3.style.pointerEvents = 'auto';
            s3.innerHTML = x[2].title;
            s3.onclick = () => {
                navigate(`/Details/${x[2].id}`);
            }
        } else {
            s3.style.opacity = 0;
            s3.disabled = true;
            s3.style.pointerEvents = 'none';
        }
        if (x[3]) {
            s4.style.opacity = 1;
            s4.disabled = false;
            s4.style.pointerEvents = 'auto';
            s4.innerHTML = x[3].title;
            s4.onclick = () => {
                navigate(`/Details/${x[3].id}`);
            }
        } else {
            s4.style.opacity = 0;
            s4.disabled = true;
            s4.style.pointerEvents = 'none';
        }
        if (x[4]) {
            s5.style.opacity = 1;
            s5.disabled = false;
            s5.style.pointerEvents = 'auto';
            s5.innerHTML = x[4].title;
            s5.onclick = () => {
                navigate(`/Details/${x[4].id}`);
            }
        } else {
            s5.style.opacity = 0;
            s5.disabled = true;
            s5.style.pointerEvents = 'none';
        }

    }

    const { logged, setLogged } = useContext(LoggedContext);
    function handleLogout() {
        setLogged(false);
        navigate('/');
        window.location.reload()
    }

    function searched(x) {
        let temp = x;
        let temp2 = "";
        for (let i = 0; i < temp.length; i++) {
            if (temp.charAt(i) == " ") {
                temp2 += "+";
            } else {
                temp2 += temp.charAt(i);
            }
        }
        navigate(`/Search/${temp2}`);
    }





    return (
        <header>
            <h1>Rizz Net</h1>




            {logged == false ? (
                <>
                    <Link to='/Register'>
                        <button>Sign up</button>
                    </Link>
                    <Link to='/Login'>
                        <button>Sign in</button>
                    </Link>
                </>
            ) : (
                <>
                    <div className="search-bar">
                        <input id="searchBar" type="text" placeholder="Search..." onChange={(e) => searching(e)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter")
                                    searched(e.target.value);
                            }}

                        /><br />
                        <button className="s1" disabled ></button><br />
                        <button className="s2" disabled ></button><br />
                        <button className="s3" disabled ></button><br />
                        <button className="s4" disabled ></button><br />
                        <button className="s5" disabled ></button>
                    </div>
                    <Link to='/Settings'>
                        <button>Settings</button>
                    </Link>
                    <Link to='/Cart'>
                        <button>Cart</button>
                    </ Link>
                    <Link to='/'>
                        <button onClick={handleLogout}>Log out</button>
                    </Link>
                </>
            )}
        </header>
    );
}

export default Header;
