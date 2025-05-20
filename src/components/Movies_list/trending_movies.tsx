import { useEffect, useState } from 'react';
import MoviePoster from './movie_poster';
import styles from "../../styles/movies_list.module.css";
import type { MovieProps } from '../Props/movie_props';
import type { TrendingProps } from '../Props/trending_props';

type TrendingMoviesProps = {
    topMoviesData: MovieProps[];
    trendingData: TrendingProps[];
};

const calculateInitialNumberOfMovies = (width: number) => { 
    if (width >= 1715) return 12;
    if (width >= 1495) return 10;
    if (width >= 1275) return 8;
    if (width >= 0) return 6;
}

export default function TrendingMovies({topMoviesData, trendingData}: TrendingMoviesProps) {
    const [moviesInTrendingList, setMoviesInTrendingList] = useState<MovieProps[]>([]);
    const [movieCount, setMovieCount] = useState(0);
    const [viewAllData, setViewAllData] = useState(false);
    const [viewportWidth, setViewportWidth] = useState<number>(0);
    const initialNumberOfMovies = calculateInitialNumberOfMovies(viewportWidth);
    const loadedData = viewAllData ? moviesInTrendingList : moviesInTrendingList.slice(0, initialNumberOfMovies);

    useEffect(() => {
        const idsFromTrendingData = new Set(trendingData.map(movie => movie.id));
        const commomElements = topMoviesData.filter(movie => idsFromTrendingData.has(movie.id));

        setMoviesInTrendingList(commomElements);
        setMovieCount(moviesInTrendingList.length);
    }, [trendingData, topMoviesData, moviesInTrendingList.length]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                setViewportWidth(window.innerWidth);
            };

            handleResize();
            window.addEventListener('resize', handleResize);
        }
    }, []);
    
    return (
        <div className={`${styles.movies_list_container} ${styles.trending_container}`}>
            <p className={styles.aux_text}>Quantidade de filmes: {movieCount}</p>
            <div className={styles.aux_container}>
                <div className={styles.movies_list}>
                    {loadedData.map((movie: MovieProps, index) => (
                        <MoviePoster key={movie.id} position={index + 1} {...movie} />
                    ))}
                </div>
                <button className={styles.show_more_button} onClick={() => setViewAllData(!viewAllData)}>{viewAllData ? "Mostrar menos" : "Mostrar mais"}</button>
            </div>
        </div>
    );
}
