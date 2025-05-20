import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Detail.css';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;

function DetailView() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [trailerKey, setTrailerKey] = useState(null);

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
            .then((response) => setMovie(response.data))

        axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`)
            .then((response) => {
                const trailer = response.data.results.find(
                    video => video.type === "Trailer" && video.site === "YouTube"
                );
                if (trailer) {
                    setTrailerKey(trailer.key);
                }
            })
            .catch(error => {
                console.error("Error fetching trailer:", error);
            });
    }, [id]);
    console.log(movie)

    if (!movie) return <p>Loading...</p>;

    return (
        <div className="detail-container">
            <div className="detail-header">
                <h1>{movie.title}</h1>
                <p>{movie.overview}</p>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            </div>
            <div className="detail-info">
                <h2>More info:</h2>
                <p>Home page: <a href={movie.homepage} target="_blank" rel="noopener noreferrer">{movie.homepage}</a></p>
                <p>Release date: {movie.release_date}</p>
                <p>Vote average: {movie.vote_average}</p>
                <p>Budget: ${movie.budget}</p>
                <p>Vote Average: {movie.vote_average}</p>
                <p>Runtime: {movie.runtime} minutes</p>
                <p>Original Language: {movie.original_language}</p>
            </div>
            <div className="trailer-section">
                <h2>Watch the trailer here</h2>
                {trailerKey ? (
                    <iframe
                        src={`https://www.youtube.com/embed/${trailerKey}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Trailer"
                    ></iframe>
                ) : (
                    <p>No trailer available</p>
                )}
            </div>
        </div>
    );
}

export default DetailView;
