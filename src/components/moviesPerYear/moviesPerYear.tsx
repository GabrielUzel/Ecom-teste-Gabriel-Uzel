import { useEffect, useState } from 'react';
import styles from "../../styles/metrics.module.css";
import type { MovieProps } from '../props/movieProps';

type MoviesPerYearProps = {
    data: MovieProps[];
};

export default function MoviesPerYear({data}: MoviesPerYearProps) { 
    const [yearsEntriesHashMap, setYearsEntriesHashMap] = useState<{ [key: string]: number }>({}); 

    useEffect(() => {
        const fillHashMap = (data: MovieProps[]) => {
            const hashMap: { [key: string]: number } = {};
            
            data.forEach((movie: MovieProps) => {
                const year = movie.release_date.slice(0, 4);
                hashMap[year] = (hashMap[year] || 0) + 1;
            });

            return hashMap;
        }

        setYearsEntriesHashMap(fillHashMap(data));
    }, [data]);
    
    return (
        <div className={`${styles.metrics_container} ${styles.movies_per_year_container}`}>
            {Object.entries(yearsEntriesHashMap)
            .map(([year, count]) => (
                <p className={styles.metrics_entrie} key={year}>{year}: {count}</p>
            ))}
        </div>
    );
}
