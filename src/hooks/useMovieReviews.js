import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchData = ({ movieId }) => {
    return api.get(`/movie/${movieId}/reviews`);
};

export const useMovieReviews = ({ movieId }) => {
    return useQuery({
        queryKey: ['movie-review', { movieId }],
        queryFn: () => fetchData({ movieId }),
        select: (result) => result.data.results,
    });
};
