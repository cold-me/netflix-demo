import React from 'react';
import { Alert, Badge, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useMovieDetail } from '../../hooks/useMovieDetail';
import './MovieDetailPage.style.css';
const MovieDetailPage = () => {
    const infoList = [
        { key: 'budget', unit: '$' },
        { key: 'revenue', unit: '$' },
        { key: 'runtime', unit: 'minutes' },
    ];
    const { id } = useParams();
    const { data: selectedMovie, isLoading, isError, error } = useMovieDetail(id);
    console.log(selectedMovie);
    if (isLoading) {
        return (
            <div className='temp'>
                <Spinner variant='danger' />
            </div>
        );
    }
    if (isError) {
        return (
            <div className='temp'>
                <Alert variant='danger'>
                    <div>{error.message}</div>
                </Alert>
            </div>
        );
    }
    return (
        <div className='detail-movie-container '>
            <div
                style={{
                    backgroundImage: `url(https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${selectedMovie?.poster_path})`,
                }}
                className='detail-banner'
            >
                <div>
                    <h1 className='detail-movie-title'>{selectedMovie?.title}</h1>
                </div>
            </div>
            <div className='detail-movie-info text-white'>
                <div>
                    <img
                        src={
                            selectedMovie?.poster_path
                                ? `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${selectedMovie?.poster_path}`
                                : '/no-image-available.png'
                        }
                    />
                </div>
                <div className='detail-movie-text'>
                    <h1 className='detail-movie-text-title'>{selectedMovie?.title}</h1>
                    <div style={{ fontStyle: 'italic', color: 'gray', fontSize: 'clamp(1rem, 1.3vw, 3rem)' }}>
                        {selectedMovie?.tagline}
                    </div>
                    <div className='detail-movie-text-genre'>
                        {selectedMovie?.genres?.map((genre) => (
                            <Badge variant='danger'>{genre.name}</Badge>
                        ))}
                    </div>
                    <div className='d-flex flex-row gap-3'>
                        <div>✨{selectedMovie?.vote_average}</div>
                        <div>🎥 {selectedMovie?.release_date}</div>
                    </div>
                    {selectedMovie?.overview && (
                        <div>
                            <div className='hr' />
                            {selectedMovie?.overview}
                            <div className='hr' />
                        </div>
                    )}

                    {infoList.map((item) => (
                        <span className='detail-movie-badge'>
                            {selectedMovie[item.key] !== 0 && (
                                <div>
                                    <Badge bg='danger' style={{ marginRight: '0.5rem' }}>
                                        {item.key}
                                    </Badge>
                                    <span>
                                        {selectedMovie[item.key]} {item.unit}
                                    </span>
                                </div>
                            )}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;
