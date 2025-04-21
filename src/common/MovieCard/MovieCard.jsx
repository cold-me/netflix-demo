import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import './MovieCard.style.css';
const MovieCard = ({ movie }) => {
    const { data: genreData } = useMovieGenreQuery();
    const showGenre = (genreIdList) => {
        if (!genreData || !genreIdList) return [];
        const genreNameList = genreIdList.map((id) => {
            const genreObj = genreData.find((genre) => genre?.id === id);
            return genreObj?.name;
        });
        return genreNameList;
    };
    const navigate = useNavigate();
    const goToMovieDetail = (movie) => {
        if (!movie) return;
        const movieGenre = showGenre(movie.genre_ids);
        navigate(`/movies/${movie.id}`, { state: { movie, movieGenre } });
    };
    return (
        <div
            style={{
                backgroundImage: `url(https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie?.poster_path})`,
            }}
            className='movie-card'
        >
            <div className='overlay' onClick={() => goToMovieDetail(movie)}>
                <h3 className='movie-card-title-text'>{movie?.title}</h3>
                {showGenre(movie?.genre_ids).map((genre, i) => (
                    <Badge bg='primary' key={i}>
                        <div className='movie-card-badge'>{genre}</div>
                    </Badge>
                ))}
                <div>
                    <div>
                        {movie?.adult ? (
                            <Badge bg='danger'>
                                <div className='movie-card-badge'>18</div>
                            </Badge>
                        ) : (
                            <Badge bg='warning'>
                                <div className='movie-card-badge'>under 18</div>
                            </Badge>
                        )}
                    </div>
                    <div className='movie-card-info-text'>
                        <div className='d-flex gap-1'>
                            <FontAwesomeIcon icon={faStar} style={{ color: '#FFD43B' }} />
                            <div> {movie?.vote_average}</div>
                            <div> 🎥 {movie?.release_date}</div>
                        </div>
                        <div className='movie-card-overview-text'>{movie?.overview}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
