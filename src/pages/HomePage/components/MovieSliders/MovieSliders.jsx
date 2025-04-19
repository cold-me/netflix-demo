import React from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';
import { useMoviesQuery } from '../../../../hooks/useMovies';
const MovieSliders = () => {
    const { data, isLoading, isError, error } = useMoviesQuery();
    console.log(data);
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
        <div>
            {data?.map(
                (item) =>
                    item?.data?.results?.length > 0 && (
                        <MovieSlider title={item?.title} movies={item?.data?.results} responsive={responsive} />
                    )
            )}
        </div>
    );
};

export default MovieSliders;
