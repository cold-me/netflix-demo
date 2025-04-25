import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';
const fetchData = (movieId) => {
    return api.get(`/movie/${movieId}/videos?language=ko-KR`);
};
export const useMovieVideo = (movieId) => {
    return useQuery({
        queryKey: ['movie-video', movieId],
        queryFn: () => fetchData(movieId),
        select: (result) => result.data.results,
    });
};
