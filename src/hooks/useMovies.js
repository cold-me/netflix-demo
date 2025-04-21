import { useQueries } from '@tanstack/react-query';
import api from '../utils/api';
const fetchMovies = (type) => {
    return api.get(`/movie/${type}`);
};
export const useMoviesQuery = () => {
    // const movieTypeList = ['popular', 'top_rated', 'upcoming'];
    const movieTypeList = [
        { query: 'popular', title: '오늘, 전 세계에서 가장 인기 있는 시리즈' },
        { query: 'upcoming', title: '곧 공개될 기대작들을 먼저 만나보세요' },
        { query: 'top_rated', title: '믿고 보는 최고 평점 작품' },
        { query: 'now_playing', title: '지금 상영 중인 인기 콘텐츠를 확인하세요' },
    ];
    return useQueries({
        queries: movieTypeList.map((type) => {
            return {
                queryKey: [`movie-${type.query}`],
                queryFn: () => fetchMovies(type.query),
            };
        }),
        combine: (results) => {
            return {
                data: results.map((result, i) => ({ data: result?.data?.data, title: movieTypeList[i]?.title })),
            };
        },
    });
};
