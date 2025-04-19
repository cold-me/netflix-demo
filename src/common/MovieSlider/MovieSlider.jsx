import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from '../MovieCard/MovieCard';
import './MovieSlider.style.css';

const MovieSlider = ({ title, movies, responsive }) => {
    return (
        <div className='popular-movie-container'>
            <h3 className='popular-movie-text'>{title}</h3>
            <Carousel
                infinite={true}
                centerMode={true}
                itemClass='movie-slider p-1'
                containerClass='carousel-container'
                responsive={responsive}
            >
                {movies?.map((movie) => (
                    <MovieCard movie={movie} />
                ))}
            </Carousel>
        </div>
    );
};

export default MovieSlider;
