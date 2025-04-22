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
    const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword, page });
    const handlePageClick = ({ selected }) => {
        setQuery({ q: keyword, page: selected + 1 });
    };
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
    if (isError) return <Alert variant='danger'>{error.message}</Alert>;
    return (
        <div className='movie-page-container'>
            <Container>
                <Row>
                    <Col lg={4} xs={12}>
                        <Filter />
                    </Col>
                    <Col lg={8} xs={12}>
                        <Row>
                            {data?.results.length > 0 ? (
                                data.results.map((movie, i) => (
                                    <Col key={i} lg={4} xs={6} md={4} style={{ height: '36dvh' }}>
                                        <MovieCard movie={movie} />
                                    </Col>
                                ))
                            ) : (
                                <>
                                    <div style={{ backgroundColor: 'grey' }}>찾으시는 영화가 없습니다.</div>
                                    {/* <Navigate to='/' /> */}
                                </>
                            )}
                        </Row>
                        <ReactPaginate
                            nextLabel='next'
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            pageCount={data?.total_pages - 1} // total page
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
        </div>
    );
};

export default MoviePage;
