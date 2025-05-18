import { useEffect, useState } from 'react';
import MoviePoster from './movie_poster';
import styles from "../../styles/top_rated_movies.module.css";
import type { MovieProps } from '../Props/movie_props';

type TopRatedMoviesProps = {
    data: MovieProps[];
};

export default function TopRatedMovies({data}: TopRatedMoviesProps) {
    const calculateInitialNumberOfMovies = (width: number) => { 
        if (width >= 1715) return 12;
        if (width >= 1495) return 10;
        if (width >= 1275) return 8;
        if (width >= 0) return 6;
    }

    const [viewAllData, setViewAllData] = useState(false);
    const [viewportWidth, setViewportWidth] = useState<number>(0);
    const initialNumberOfMovies = calculateInitialNumberOfMovies(viewportWidth);

    const loadedData = viewAllData ? data : data.slice(0, initialNumberOfMovies);
    
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
        <div className={styles.movies_list_container}>
            <div className={styles.movies_list}>
                {loadedData.map((movie: MovieProps, index) => (
                    <MoviePoster key={movie.id} position={index + 1} {...movie} />
                ))}
            </div>
            <button className={styles.show_more_button} onClick={() => setViewAllData(!viewAllData)}>{viewAllData ? "Mostrar menos" : "Mostrar mais"}</button>
        </div>
    );
}
