import React, { useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useMovieReviews } from '../../../hooks/useMovieReviews';
import './Reviews.style.css';
const Reviews = ({ movieId }) => {
    const { data, isLoading, isError, error } = useMovieReviews({ movieId });
    const [moreInfo, setMoreInfoState] = useState(false);
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
                <Alert variant='danger'>{error.message}</Alert>
            </div>
        );
    }
    return (
        <>
            <div className='reviews-area'>
                <Button className='review-btn' variant='warning'>
                    REVIEWS({data?.length})
                </Button>
                {/* {data?.length > 0 && ( */}
                <div className='reviews-container'>
                    {data?.length > 0 ? (
                        <div>
                            <div className={`${!moreInfo ? 'reviews-more-container' : ''}`}>
                                {data?.map((item) => (
                                    <div className='review' key={item?.id}>
                                        <div className='review-rating'>
                                            {item?.author_details?.rating && (
                                                <div>
                                                    <span>{'⭐️'.repeat(item?.author_details?.rating)}</span>
                                                    <small>({item?.author_details?.rating})</small>
                                                </div>
                                            )}
                                        </div>
                                        <div className='review-author'>
                                            {item?.author}
                                            <span className='review-created-at'> ({item?.created_at})</span>
                                        </div>
                                        <div className='review-content'>{item?.content}</div>
                                    </div>
                                ))}
                            </div>
                            <Button
                                variant='secondary'
                                className='reviews-more-btn'
                                onClick={() => setMoreInfoState(!moreInfo)}
                            >
                                {moreInfo ? 'close' : 'more'}
                            </Button>
                        </div>
                    ) : (
                        <div style={{ color: 'white' }}>등록된 리뷰가 없습니다.</div>
                    )}
                </div>
                {/* )} */}
            </div>
        </>
    );
};

export default Reviews;
