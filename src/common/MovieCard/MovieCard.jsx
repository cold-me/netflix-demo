import React from 'react';
import { Badge } from 'react-bootstrap';
import './MovieCard.style.css';
const MovieCard = ({ movie }) => {
    return (
        <div
            style={{
                backgroundImage: `url(https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path})`,
            }}
            className='movie-card'
        >
            <div className='overlay'>
                <h3 className='movie-card-title-text'>{movie.title}</h3>
                {movie.genre_ids.map((id, i) => (
                    <Badge bg='primary' key={i}>
                        {id}
                    </Badge>
                ))}
                <div>
                    <div>{movie.adult ? <Badge bg='danger'>18</Badge> : <Badge bg='warning'>under 18</Badge>}</div>
                    <div className='movie-card-info-text'>
                        <div>평점 {movie.vote_average}</div>
                        <div>점수 {movie.popularity}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
