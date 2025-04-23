import React, { useEffect } from 'react';
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../../common/MovieCard/MovieCard';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import Filter from './components/Filter/Filter';
import './MoviePage.style.css';

const MoviePage = () => {
    const [query, setQuery] = useSearchParams();
    const keyword = query.get('q') || '';
    const page = Number(query.get('page')) || 1;
    // const sorting = query.get('sort_by') || '';
    const searchResult = useSearchMovieQuery({ keyword, page });
    // const discoverResult = useDiscoverMoviesQuery({ sorting, page });
    // const { data, isLoading, isError, error } = keyword ? discoverResult : searchResult;
    const { data, isLoading, isError, error } = searchResult;
    const handlePageClick = ({ selected }) => setQuery({ q: keyword, page: selected + 1 });
    useEffect(() => {}, [page, keyword]);

    if (isLoading) {
        return (
            <div>
                <div className='temp'>
                    <Spinner variant='danger' />
                </div>
            </div>
        );
    }
    if (isError)
        return (
            <div className='temp'>
                <Alert variant='danger'>
                    <div>{error.message}</div>
                </Alert>
            </div>
        );
    return (
        <div className='movie-page-container'>
            {data?.results?.length > 0 ? (
                <Container>
                    <Row>
                        <Col lg={4} xs={12}>
                            <div className='movie-page-filter-container'>
                                <Filter>카테고리별</Filter>
                                <Filter>장르별</Filter>
                            </div>
                        </Col>
                        <Col lg={8} xs={12}>
                            <Row>
                                {data.results.map((movie, i) => (
                                    <Col key={i} lg={4} xs={6} md={4} style={{ height: '36dvh' }}>
                                        <MovieCard movie={movie} />
                                    </Col>
                                ))}
                            </Row>
                            <ReactPaginate
                                nextLabel='next'
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={data?.total_pages > 500 ? 500 : data?.total_pages - 1} // total page
                                previousLabel='previous'
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
                        </Col>
                    </Row>
                </Container>
            ) : (
                <div className='no-search'>찾으시는 영화가 없습니다.</div>
            )}
        </div>
    );
};

export default MoviePage;
