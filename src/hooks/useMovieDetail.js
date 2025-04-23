import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';
const fetchData = (movieId) => {
    return api.get(`/movie/${movieId}?language=ko-KR`);
};

export const useMovieDetail = (movieId) => {
    return useQuery({
        queryKey: ['movie-detail', movieId],
        queryFn: () => fetchData(movieId),
        select: (result) => result.data,
    });
};
