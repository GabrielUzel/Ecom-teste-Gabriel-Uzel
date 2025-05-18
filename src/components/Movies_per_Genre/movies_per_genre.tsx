import { useEffect, useState } from 'react';
import Genre from './genre';
import styles from "../../styles/metrics.module.css";
import type { MovieProps } from '../Props/movie_props';
import type { GenreProps } from '../Props/genre_props';

type MoviesPerGenreProps = {
    data: MovieProps[];
};

export default function MoviesPerGenre({data}: MoviesPerGenreProps) {
    const [genresData, setGenresData] = useState<GenreProps[]>([]);
    const [genreId_entries_hashMap, setGenreId_entries_hashMap] = useState<{ [key: string]: number }>({}); 
 
    useEffect(() => {
        try {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
                }
            };

            fetch('https://api.themoviedb.org/3/genre/movie/list?language=pt-br', options)
            .then(res => res.json())
            .then(data => {
                setGenresData(data.genres);
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    useEffect(() => {
        if (genresData.length === 0) return;

        const getGenreNameById = (genreId: number) => {
            const genre = genresData.find(genre => genre.id === genreId);
            return genre ? genre.name : 'Desconhecido';
        }

        const fillHashMap = (data: MovieProps[]) => {
            const hashMap: { [key: string]: number } = {};
            
            data.forEach((movie: MovieProps) => {
                movie.genre_ids.forEach((genreId: number) => { 
                    const genreName = getGenreNameById(genreId);
                    hashMap[genreName] = (hashMap[genreName] || 0) + 1;
                });
            });

            return hashMap;
        }

        setGenreId_entries_hashMap(fillHashMap(data));
    }, [genresData, data]);
    
    return (
        <div className={`${styles.metrics_container} ${styles.movies_per_genre_container}`}>
            {Object.entries(genreId_entries_hashMap)
            .sort((a, b) => b[1] - a[1])
            .map(([genreName, count], index) => (
                <Genre key={genreName} position={index + 1} genreName={genreName} count={count} />
            ))}
        </div>
    );
}
