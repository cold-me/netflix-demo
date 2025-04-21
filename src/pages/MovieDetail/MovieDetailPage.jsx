import React from 'react';
import { Badge } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import './MovieDetailPage.style.css';

const MovieDetailPage = () => {
    const location = useLocation();
    const { movie: selectedMovie, movieGenre: selectedMovieGenre } = location.state || {};
    console.log(location, selectedMovie?.poster_path);
    return (
        <div className='detail-movie-container '>
            <div
                style={{
                    backgroundImage: `url(https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${selectedMovie?.poster_path})`,
                }}
                className='detail-banner'
            >
                <div>
                    <h1 className='movie-detail-title'>{selectedMovie?.title}</h1>
                </div>
            </div>
            <div className='movie-detail-info text-white'>
                <img src={`https://media.themoviedb.org/t/p/w500${selectedMovie?.poster_path}`} />
                <div className='movie-detail-text'>
                    <h1 className='movie-detail-text-title'>{selectedMovie?.title}</h1>
                    <div className='movie-detail-text-genre'>
                        {selectedMovieGenre.map((genre) => (
                            <Badge variant='danger'>{genre}</Badge>
                        ))}
                    </div>
                    <div className='d-flex flex-row gap-3'>
                        <div>✨{selectedMovie?.vote_average}</div>
                        <div>🎥 {selectedMovie?.release_date}</div>
                    </div>
                    <div>{selectedMovie?.overview}</div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;
