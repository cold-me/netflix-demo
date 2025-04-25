import React from 'react';
import { Alert, Badge, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useMovieDetail } from '../../hooks/useMovieDetail';
import { useMovieVideo } from '../../hooks/useMovieVideo';
import dollarToKRW from '../../utils/dollarToKRW';
import './MovieDetailPage.style.css';
import Reviews from './components/Reviews';
const MovieDetailPage = () => {
    const infoList = [
        { key: 'budget', unit: '원' },
        { key: 'revenue', unit: '원' },
        { key: 'runtime', unit: '분' },
    ];
    const { id } = useParams();
    const {
        data: selectedMovie,
        isLoading: selectedMovieIsLoading,
        isError: selectedMovieIsError,
        error: selectedMovieError,
    } = useMovieDetail(id);
    const {
        data: movieVideoData,
        isLoading: movieVideoIsLoading,
        isError: movieVideoIsError,
        error: movieVideoError,
    } = useMovieVideo(id);
    console.log('☀️', movieVideoData);
    if (selectedMovieIsLoading || movieVideoIsLoading) {
        return (
            <div className='temp'>
                <Spinner variant='danger' />
            </div>
        );
    }
    if (selectedMovieIsError || movieVideoIsError) {
        return (
            <div className='temp'>
                <Alert variant='danger'>
                    <div>{selectedMovieError.message}</div>
                    <div>{movieVideoError.message}</div>
                </Alert>
            </div>
        );
    }
    const officialYoutube = movieVideoData?.find((video) => video.site === 'YouTube' && video.official);
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
            {officialYoutube && (
                <div className='video-area'>
                    <iframe
                        src={`https://www.youtube.com/embed/${officialYoutube.key}?autoplay=1&mute=1`}
                        title={officialYoutube.name}
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                    ></iframe>
                </div>
            )}
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
                        {selectedMovie?.genres?.map((genre, i) => (
                            <Badge bg='danger' style={{ margin: '0.1rem' }} key={i}>
                                {genre.name}
                            </Badge>
                        ))}
                    </div>
                    <h1 className='detail-movie-text-title'>{selectedMovie?.title}</h1>
                    <div className='tagline-text'>{selectedMovie?.tagline}</div>
                    <div className='detail-movie-vote-average-and-release noto-sans-kr-500 '>
                        {selectedMovie?.vote_average > 0 && (
                            <div className='d-flex flex-column'>
                                <span className='detail-icon'>⭐️</span>
                                <span className='text-warning'>
                                    {selectedMovie?.vote_average && selectedMovie?.vote_average.toFixed(1)}
                                </span>
                            </div>
                        )}
                        {selectedMovie?.release_date && (
                            <div className='d-flex flex-column'>
                                <span className='detail-icon'> 🎥 </span>
                                <span className='text-secondary'>{selectedMovie?.release_date}</span>
                            </div>
                        )}
                    </div>
                    {selectedMovie?.overview && (
                        <div>
                            <div className='hr' />
                            <div className='detail-movie-overview'>{selectedMovie?.overview}</div>
                            <div className='hr' />
                        </div>
                    )}

                    {infoList.map((item, i) => (
                        <span className='detail-movie-badge' key={i}>
                            {selectedMovie[item.key] > 0 && (
                                <div>
                                    <Badge bg='secondary' style={{ marginRight: '0.5rem' }}>
                                        {item.key}
                                    </Badge>
                                    <span>
                                        {item.unit === '원'
                                            ? dollarToKRW(selectedMovie[item.key])
                                            : selectedMovie[item.key]}
                                        {item.unit}
                                    </span>
                                </div>
                            )}
                        </span>
                    ))}
                    <div className='detail-movie-badge' style={{ fontSize: 'clamp(0.9rem, 1.3vw, 3rem)' }}>
                        <Badge bg='secondary' style={{ marginRight: '0.5rem' }}>
                            official video
                        </Badge>
                        <span>{officialYoutube ? '제공' : '미제공'}</span>
                    </div>
                </div>
            </div>
            <Reviews movieId={selectedMovie?.id} />
        </div>
    );
};

export default MovieDetailPage;
