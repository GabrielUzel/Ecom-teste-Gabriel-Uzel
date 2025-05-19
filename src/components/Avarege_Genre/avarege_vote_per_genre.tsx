import { useEffect, useState } from 'react';
import styles from "../../styles/metrics.module.css";
import Avarege from './avarege';
import type { MovieProps } from '../Props/movie_props';
import type { GenreProps } from '../Props/genre_props';

type AvaregePerGenreProps = {
    data: MovieProps[];
    genresData: GenreProps[];
};

export default function AvaregeVotePerGenre({data, genresData}: AvaregePerGenreProps) {
    const [avarege_genres_hashMap, setAvarege_genres_hashMap] = useState<{ [key: string]: number[] }>({}); 

    useEffect(() => {
        if (genresData.length === 0) return;

        const getGenreNameById = (genreId: number) => {
            const genre = genresData.find(genre => genre.id === genreId);
            return genre ? genre.name : 'Desconhecido';
        }

        const fillHashMap = (data: MovieProps[]) => {
            const hashMap: { [key: string]: number[] } = {};
            
            data.forEach((movie: MovieProps) => {
                movie.genre_ids.forEach((genreId: number) => { 
                    const genreName = getGenreNameById(genreId);
                    
                    if (!hashMap[genreName]) {
                        hashMap[genreName] = [0, 0];
                    }

                    hashMap[genreName][0] += 1;
                    hashMap[genreName][1] += movie.vote_average; 
                });
            });

            return hashMap;
        }

        setAvarege_genres_hashMap(fillHashMap(data));
    }, [data, genresData]);
    
    return (
        <div className={`${styles.metrics_container} ${styles.genres_container}`}>
            {Object.entries(avarege_genres_hashMap)
            .sort((first, second) => {
                const firstAverage = first[1][1] / first[1][0]; 
                const secondAverage = second[1][1] / second[1][0]; 
                return secondAverage - firstAverage;
            })
            .map(([genreName, [total, avarege]], index) => (
                <Avarege key={genreName} position={index + 1} genreName={genreName} avarege={avarege / total} />
            ))}
        </div>
    );
}
