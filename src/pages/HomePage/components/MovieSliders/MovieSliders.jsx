import React from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';
import { useMoviesQuery } from '../../../../hooks/useMovies';
const MovieSliders = () => {
    const { data, isLoading, isError, error } = useMoviesQuery();
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
