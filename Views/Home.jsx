import React, { useEffect, useState } from 'react';
import MovieBlock from '../src/Components/MovieBlock';
import './Home.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../src/Components/Header';
import Footer from '../src/Components/Footer';

const API_KEY = import.meta.env.VITE_API_KEY;

function Home() {
    const [movies, setMovies] = useState([]);
    const [randomIndices, setRandomIndices] = useState([]);

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`)
            .then((response) => {
                const results = response.data.results;
                setMovies(results);

                const indices = [];
                while (indices.length < 4) {
                    const num = Math.floor(Math.random() * results.length);
                    if (!indices.includes(num)) {
                        indices.push(num);
                    }
                }
                setRandomIndices(indices);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <>
            <Header />
            <div className="home-container">
                <section className="hero">
                    <div className="hero-text">
                        <h1>RizzNet</h1>
                        <p>Your daily dose of cinematic rizz. Discover what's hot today.</p>
                        <Link to="/genres" className="cta-button">Explore All</Link>
                    </div>
                </section>

                <section className="trending-section">
                    <h2>🔥 Trending Now</h2>
                    <div className="discovery">
                        {randomIndices.length === 4 &&
                            randomIndices.map(index => {
                                const movie = movies[index];
                                return (
                                    <MovieBlock
                                        key={movie.id}
                                        poster_path={movie.poster_path}
                                        id={movie.id}
                                    />
                                );
                            })
                        }
                    </div>
                </section>

                <section className="cta-section">
                    <p>Ready to dive in?</p>
                    <Link to="/Register" className="cta-button">Join Us</Link>
                </section>
            </div>
            <Footer />
        </>
    );
}

export default Home;
