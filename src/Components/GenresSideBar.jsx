import React from 'react';
import './Sidebar.css';


function GenreSideBar({ setGenre, refreshPage }) {

    const genreMap = {
        'Action': 28,
        'Adventure': 12,
        'Animation': 16,
        'Crime': 80,
        'Family': 10751,
        'Fantasy': 14,
        'History': 36,
        'Horror': 27,
        'Mystery': 9648,
        'Sci-Fi': 878,
        'War': 10752,
        'Western': 37
    };

    function transferF(x) {
        const genreId = genreMap[x];
        setGenre(genreId);
        refreshPage();
    }

    const genres = Object.keys(genreMap);

    return (
        <div className="sidebar">
            <h2>Genres</h2>
            <ul className="genre-list">
                {genres.map((genre) => (
                    <li key={genre}>
                        <button onClick={() => transferF(genre)}>{genre}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GenreSideBar;
