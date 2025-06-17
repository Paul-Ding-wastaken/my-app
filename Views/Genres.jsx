import React from 'react';
import Sidebar from '../src/Components/GenresSideBar';
import { useState, useEffect } from 'react';
import MovieBlock from '../src/Components/MovieBlock';
import './Genres.css';
import axios from 'axios';
import Header from '../src/Components/Header';
import { useContext } from 'react';
import UserContext from '../src/Components/userData';


const API_KEY = import.meta.env.VITE_API_KEY;

function Genres() {
    const { curgenre } = useContext(UserContext);
    const [curPage, setCurPage] = useState(1);
    const [movies, setMovies] = useState([]);

    function handlePageChange(x) {
        if (x === -1 && curPage > 1) {
            setCurPage(curPage - 1);
        } else if (x === 1) {
            setCurPage(curPage + 1);
        }
    }

    function refreshPage() {
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${curgenre}&page=${curPage}&adult=false`)
            .then((response) => {
                setMovies(response.data.results);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    useEffect(() => {
        refreshPage();
    }, [curPage, curgenre]);

    return (
        <>
            <Header />
            <div className="page-container">
                <Sidebar />
                <div className="content">
                    <div className="movies-grid">
                        {movies.length > 0 ? movies.slice(0, 20).map((movie) => (
                            <MovieBlock
                                key={movie.id}
                                poster_path={movie.poster_path}
                                id={movie.id}
                                title={movie.title}
                            />
                        )) : <h1>Sorry bub. There's nothing left out here...</h1>}
                    </div>
                    <div className="pagination-buttons">
                        <button onClick={() => handlePageChange(-1)} disabled={curPage === 1}>Previous Page</button>
                        <button onClick={() => handlePageChange(1)}>Next Page</button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Genres;