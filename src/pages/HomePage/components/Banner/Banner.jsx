import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
import './Banner.style.css';
const Banner = () => {
    const { data, isLoading, isError, error } = usePopularMoviesQuery();

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
                <Alert variant='danger' />
                <div>{error.message}</div>
            </div>
        );
    }
    return (
        <div
            style={{
                backgroundImage: `url(https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${data?.results[0].poster_path})`,
            }}
            className='banner'
        >
            <div className='text-white banner-text-area'>
                <h1 className='banner-title-text'>{data?.results[0].title}</h1>
                <div className='banner-overview-text'>{data?.results[0].overview}</div>
            </div>
        </div>
    );
};

export default Banner;
