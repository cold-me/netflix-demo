import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';
const fetchData = ({ genre, page }) => {
    return api.get(`/discover/movie?page=${page}&with_genres=${genre},&language=ko-KR`);
};
export const useMoviesByGenreQuery = ({ genre, page }) => {
    return useQuery({
        queryKey: ['movies-by-genre', { genre, page }],
        queryFn: () => fetchData({ genre, page }),
        select: (result) => result?.data,
    });
};
