import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';
const fetchSearchMovie = ({ keyword, page }) => {
    return keyword
        ? api.get(`/search/movie?query=${keyword}&page=${page}&language=ko-KR`)
        : api.get(`/movie/popular?page=${page}&language=ko-KR`);
};
export const useSearchMovieQuery = ({ keyword, page }) => {
    return useQuery({
        queryKey: ['movie-search', { keyword, page }],
        queryFn: () => fetchSearchMovie({ keyword, page }),
        select: (result) => result.data,
    });
};
