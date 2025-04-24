import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';
const fetchData = ({ page, sorting }) => {
    return api.get(`/discover/movie?page=${page}&sort_by=${sorting}&language=ko-KR`);
};
export const useMoviesByCategoryQuery = ({ sorting, page }) => {
    return useQuery({
        queryKey: ['movies-category', { sorting, page }],
        queryFn: () => fetchData({ page, sorting }),
        select: (result) => {
            return result?.data;
        },
    });
};
