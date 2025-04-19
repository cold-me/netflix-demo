import React from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
import MovieCard from '../MovieCard/MovieCard';
import './PopularMovieSlide.style.css';
const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 8,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};
const PopularMovieSlide = () => {
    const { data, isLoading, isError, error } = usePopularMoviesQuery();
    if (isLoading) {
        return (
            <div>
                <Spinner animation='grow' variant='dark' />
                <h1>Loading... </h1>
            </div>
        );
    }
    if (isError) {
        return <Alert variant='danger'>{error.message}</Alert>;
    }
    return (
        <div className='popular-movie-container'>
            <h3 className='popular-movie-text'>오늘 전세계 TOP 10 시리즈</h3>
            <Carousel
                infinite={true}
                centerMode={true}
                itemClass='movie-slider p-1'
                containerClass='carousel-container'
                responsive={responsive}
            >
                {data?.results.map((movie, i) => (
                    <MovieCard movie={movie} key={i} />
                ))}
            </Carousel>
        </div>
    );
};

export default PopularMovieSlide;
