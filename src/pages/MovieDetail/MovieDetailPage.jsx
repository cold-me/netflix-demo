import React from 'react';
import { Alert, Badge, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useMovieDetail } from '../../hooks/useMovieDetail';
import './MovieDetailPage.style.css';
const MovieDetailPage = () => {
    const infoList = [
        { key: 'budget', unit: '$' },
        { key: 'revenue', unit: '$' },
        { key: 'runtime', unit: '분' },
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
                <div></div>
                <img
                    src={
                        selectedMovie?.poster_path
                            ? `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${selectedMovie?.poster_path}`
                            : '/no-image-available.png'
                    }
                />
                <div className='detail-movie-text'>
                    <div className='detail-movie-text-genre'>
                        {selectedMovie?.genres?.map((genre) => (
                            <Badge bg='danger'>{genre.name}</Badge>
                        ))}
                    </div>
                    <h1 className='detail-movie-text-title'>{selectedMovie?.title}</h1>
                    <div className='tagline-text'>{selectedMovie?.tagline}</div>
                    <div className='detail-movie-vote-average-and-release'>
                        <div>✨{selectedMovie?.vote_average} </div>
                        <div>🎥 {selectedMovie?.release_date}</div>
                    </div>
                    {selectedMovie?.overview && (
                        <div>
                            <div className='hr' />
                            <div className='detail-movie-overview'>{selectedMovie?.overview}</div>
                            <div className='hr' />
                        </div>
                    )}

                    {infoList.map((item) => (
                        <span className='detail-movie-badge'>
                            {selectedMovie[item.key] !== 0 && (
                                <div>
                                    <Badge bg='secondary' style={{ marginRight: '0.5rem' }}>
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
