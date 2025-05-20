import react, { useState, useEffect } from 'react';
import MovieBlock from '../src/Components/MovieBlock';
import Header from '../src/Components/Header';
import './Search.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Search() {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const [curPage, setCurPage] = useState(1);
    const [movies, setMovies] = useState([]);
    const { id } = useParams();

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
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&page=${curPage}&query=${id}&adult=false`)
            .then((response) => {
                setMovies(response.data.results);
                
            })
            .catch(error => console.error('Error fetching data:', error));
    }

        useEffect(() => {
            refreshPage();
        }, [curPage, id]);

    return (
        <>
            <Header />
            <div className="page-container">
                <div className="content">
                    <div className="movies-grid">
                        {movies.slice(0, 20).map((movie) => (
                            <MovieBlock
                                key={movie.id}
                                poster_path={movie.poster_path}
                                id={movie.id}
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

export default Search