import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';
const fetchData = ({ page, criteria }) => {
    console.log(`/discover/movie?q=&page=${page}&sort_by=${criteria}&language=ko-KR`);
    return api.get(`/discover/movie?q=&page=${page}&sort_by=${criteria}&language=ko-KR`);
};
export const useDiscoverMoviesQuery = ({ criteria, page }) => {
    console.log(page, criteria);
    return useQuery({
        queryKey: ['discover-movies', { criteria, page }],
        queryFn: () => fetchData(criteria),
        select: (result) => {
            console.log('discover data:', result?.data?.results);
            return result?.data;
        },
    });
};
