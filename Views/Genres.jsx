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
    const {curgenre, setCurgenre} = useContext(UserContext);
    console.log(curgenre);
    const [curGenre, setGenre] = useState(curgenre);
    const [curPage, setCurPage] = useState(1);
    const [movies, setMovies] = useState([]);

    function handlePageChange(x) {
        if (x === -1) {
            if (curPage > 1) {
                setCurPage(curPage - 1);
            }
        } else {
            setCurPage(curPage + 1);
        }
    }

    function refreshPage() {
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${curGenre}&page=${curPage}`)
            .then((response) => {
                setMovies(response.data.results);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    useEffect(() => {
        refreshPage();
    }, [curPage, curGenre]);

    return (
        <>
            <Header />
            <div className="page-container">
                <Sidebar setGenre={setGenre} refreshPage={() => refreshPage()} />
                <div className="content">
                    <div className="movies-grid">
                        {movies.slice(0, 20).map((movie) => (
                            <MovieBlock
                                key={movie.id}
                                poster_path={movie.poster_path}
                                id={movie.id}
                                title={movie.title}
                            />
                        ))}
                    </div>
                    <div className="pagination-buttons">
                        <button onClick={() => handlePageChange(-1)}>Previous Page</button>
                        <button onClick={() => handlePageChange(1)}>Next Page</button>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Genres