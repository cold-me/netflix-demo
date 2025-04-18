import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AppLayout from './layouts/AppLayout';
import HomePage from './pages/HomePage/HomePage';
import MovieDetailPage from './pages/MovieDetail/MovieDetailPage';
import MoviePage from './pages/Movies/MoviePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<AppLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path='movies'>
                        <Route index element={<MoviePage />} />
                        <Route path=':id' element={<MovieDetailPage />} />
                    </Route>
                </Route>
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </div>
    );
}

export default App;
