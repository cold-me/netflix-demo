import React, { useEffect, useState } from 'react';
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { Navigate, useSearchParams } from 'react-router-dom';
import MovieCard from '../../common/MovieCard/MovieCard';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import Filter from './components/Filter/Filter';
import './MoviePage.style.css';
const MoviePage = () => {
    const [query, _] = useSearchParams();
    const keyword = query.get('q');
    const [page, setPage] = useState(1);
    const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword, page });
    const handlePageClick = ({ selected }) => setPage(selected + 1);

    useEffect(() => {
        setPage(1);
    }, [keyword]);

    if (isLoading) {
        return (
            <div>
                <div className='temp'>
                    <Spinner variant='danger' />
                </div>
            </div>
        );
    }
    if (isError) <Alert variant='danger'>{error.message}</Alert>;
    return (
        <div className='movie-page-container'>
            <Container>
                <Row>
                    <Col lg={4} xs={12}>
                        <Filter />
                    </Col>
                    <Col lg={8} xs={12}>
                        <Row>
                            {data?.results ? (
                                data?.results?.map((movie, i) => (
                                    <Col key={i} lg={4} xs={6} md={4} style={{ height: '36dvh' }}>
                                        <MovieCard movie={movie} />
                                    </Col>
                                ))
                            ) : (
                                <Navigate to='/' />
                            )}
                        </Row>
                        <div className='movie-page-paginate'>
                            <ReactPaginate
                                nextLabel='next >'
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={data?.total_pages} // total page
                                previousLabel='< previous'
                                pageClassName='page-item'
                                pageLinkClassName='page-link'
                                previousClassName='page-item'
                                previousLinkClassName='page-link'
                                nextClassName='page-item'
                                nextLinkClassName='page-link'
                                breakLabel='...'
                                breakClassName='page-item'
                                breakLinkClassName='page-link'
                                containerClassName='pagination'
                                activeClassName='active'
                                renderOnZeroPageCount={null}
                                forcePage={page - 1}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default MoviePage;
