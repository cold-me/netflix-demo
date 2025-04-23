import React from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { useMovieGenreQuery } from '../../../../hooks/useMovieGenre';
import './Filter.style.css';
const Filter = ({ children }) => {
    const categories = [
        { slug: 'popularity.desc', label: '인기 높은 순' },
        { slug: 'popularity.asc', label: '인기 낮은 순' },
    ];

    const {
        data: genreData,
        isLoading: genreIsLoading,
        isError: genreIsError,
        error: genreError,
    } = useMovieGenreQuery();
    if (genreIsLoading) {
        return (
            <div className='temp'>
                <Spinner variant='danger' />
            </div>
        );
    }
    if (genreIsError) {
        return (
            <div className='temp'>
                <Alert variant='danger'>
                    <div>{genreError.message}</div>
                </Alert>
            </div>
        );
    }

    return (
        <div className='filter-container'>
            <Dropdown>
                <Dropdown.Toggle variant='outline-danger' style={{ width: '100%' }}>
                    {children}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ width: '100%' }}>
                    {children === '카테고리별'
                        ? categories?.map((category) => (
                              <Dropdown.Item href={`/movies?q=&page=1&sort_by=${category.slug}`}>
                                  {category.label}
                              </Dropdown.Item>
                          ))
                        : genreData?.map((genre) => (
                              <Dropdown.Item href={`/movies?q=&page=1&genre=${genre.id}`}>{genre.name}</Dropdown.Item>
                          ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default Filter;
