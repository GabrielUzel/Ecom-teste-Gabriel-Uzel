import { useEffect, useState } from 'react';
import styles from "../../styles/avarege_vote_per_genre.module.css";
import type { MovieProps } from '../Props/movie_props';

type AvaregeVotePerGenreProps = {
    data: MovieProps[];
};

// const fillHashMap = (hashMap: Record<number, number>, data: MovieProps[]) => {
//     data.forEach((movie: MovieProps) => {
//         movie.genre_ids.forEach((genreId: number) => { 
//             hashMap[genreId] = (hashMap[genreId] || 0) + 1;
//         });
//     });

//     return hashMap;
// }

// const calculateTotalGenresEntries = (hashMap: Record<number, number>) => {
//     let total = 0;

//     for (const key in hashMap) {
//         total += hashMap[key];
//     }

//     return total;
// }

export default function AvaregeVotePerGenre({data}: AvaregeVotePerGenreProps) {
    // const genreId_entries_hashMap = fillHashMap({}, data);
    // const totalGenreEntries = calculateTotalGenresEntries(genreId_entries_hashMap);

    return (
        <>
            {/* <pre>{JSON.stringify(genreId_entries_hashMap, null, 2)}</pre>
            <p>Total: {totalGenreEntries}</p> */}
        </>
    );
}
