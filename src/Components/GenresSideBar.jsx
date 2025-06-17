import React, { useContext } from 'react';
import './Sidebar.css';
import UserContext from '../Components/userData';

function GenreSideBar({ refreshPage }) {
    const { genres, setCurgenre } = useContext(UserContext);

    const genreArray = [
        ['Action', 28],
        ['Adventure', 12],
        ['Animation', 16],
        ['Crime', 80],
        ['Family', 10751],
        ['Fantasy', 14],
        ['History', 36],
        ['Horror', 27],
        ['Mystery', 9648],
        ['Sci-Fi', 878],
        ['War', 10752],
        ['Western', 37]
    ];

    function handleClick(id) {
        setCurgenre(id);
        if (refreshPage) refreshPage();
    }
    return (
        <div className="sidebar">
            <h2>Genres</h2>
            <ul className="genre-list">
                {genreArray.map(([name, id], index) =>
                    genres[index] ? (
                        <li key={id}>
                            <button onClick={() => handleClick(id)}>{name}</button>
                        </li>
                    ) : null
                )}
            </ul>
        </div>
    );
}

export default GenreSideBar;
