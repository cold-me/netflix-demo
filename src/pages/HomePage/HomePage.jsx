import React from 'react';
import Banner from './components/Banner/Banner';
import MovieSliders from './components/MovieSliders/MovieSliders';
// 1. 배너 => popular movie 를 들고와서 첫번째 아이템을 보여준다
// 2. popular movie
// 3. top rated movie
// 4. upcoming movie
const HomePage = () => {
    return (
        <div>
            <Banner />
            <MovieSliders />
        </div>
    );
};

export default HomePage;
