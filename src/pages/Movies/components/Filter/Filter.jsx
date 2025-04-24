import React from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
import { useMovieGenreQuery } from '../../../../hooks/useMovieGenre';
import './Filter.style.css';
const Filter = ({ children }) => {
    const navigate = useNavigate();
    const categories = [
        { slug: 'popularity.desc', label: '인기 높은 순' },
        { slug: 'popularity.asc', label: '인기 낮은 순' },
    ];
    const { data, isLoading, isError, error } = useMovieGenreQuery();

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

    const handleCategory = (criteria) => navigate(`/movies?page=1&sort_by=${criteria}`);
    const handleGenre = (genre) => navigate(`/movies?page=1&with_genres=${genre}`);
    return (
        <div className='filter-container'>
            <Dropdown>
                <Dropdown.Toggle variant='outline-danger' style={{ width: '100%' }}>
                    {children}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ width: '100%' }}>
                    {children === '카테고리별'
                        ? categories?.map((category) => (
                              <Dropdown.Item onClick={() => handleCategory(category.slug)}>
                                  {category.label}
                              </Dropdown.Item>
                          ))
                        : data?.map((genre) => (
                              <Dropdown.Item onClick={() => handleGenre(genre.id)}>{genre.name}</Dropdown.Item>
                          ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default Filter;
