import { useEffect, useState } from 'react';
import Genre from './genre';
import styles from "../../styles/metrics.module.css";
import type { MovieProps } from '../props/movieProps';
import type { GenreProps } from '../props/genreProps';
import Loading from '../loading';

type MoviesPerGenreProps = {
    data: MovieProps[];
    genresData: GenreProps[];
    isLoading: boolean;
};

export default function MoviesPerGenre({data, genresData, isLoading}: MoviesPerGenreProps) {
    const [genreIdEntriesHashMap, setGenreIdEntriesHashMap] = useState<{ [key: string]: number }>({}); 

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

        setGenreIdEntriesHashMap(fillHashMap(data));
    }, [genresData, data]);
    
    if(isLoading) {
        return <Loading />;
    }

    return (
        <div className={`${styles.metrics_container} ${styles.genres_container}`}>
            {Object.entries(genreIdEntriesHashMap)
            .sort((first, second) => second[1] - first[1])
            .map(([genreName, count], index) => (
                <Genre key={genreName} position={index + 1} genreName={genreName} count={count} />
            ))}
        </div>
    );
}
