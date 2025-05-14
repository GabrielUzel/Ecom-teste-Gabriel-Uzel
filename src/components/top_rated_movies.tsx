'use client'

import { useEffect, useState } from 'react';
import MoviePoster from './movie_poster';
import styles from "../styles/top_rated_movies.module.css";

type MovieProps = {
  id: number;
  genre_ids: number[];
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
};

const calculateInitialNumberOfMovies = (width: number) => { 
    if (width >= 1715) return 12;
    if (width >= 1495) return 10;
    if (width >= 1275) return 8;
    if (width >= 0) return 6;
}

export default function TopRatedMovies() {
    const [data, setData] = useState<MovieProps[]>([]);
    const [viewAllData, setViewAllData] = useState(false);
    const [viewportWidth, setViewportWidth] = useState<number>(0);
    const initialNumberOfMovies = calculateInitialNumberOfMovies(viewportWidth);

    const loadedData = viewAllData ? data : data.slice(0, initialNumberOfMovies);



    useEffect(() => {
        const fetchPages = async () => {
            try {
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${process.env.API_KEY}`
                    }
                };

                const totalPages = 13;
                const baseUrl = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=';

                const fetchPromises = Array.from({ length: totalPages }, (_, i) =>
                    fetch(`${baseUrl}${i + 1}`, options)
                    .then(res => res.json())
                );

                const results = await Promise.all(fetchPromises);
                const fullData = results.flatMap(page => page.results || []);
                const filteredData = fullData.map((item: {
                    id: number; 
                    genre_ids: number[]; 
                    title: string; 
                    overview: string; 
                    poster_path: string; 
                    release_date: string; 
                    vote_average: number; 
                }) => ({
                    id: item.id,
                    genre_ids: item.genre_ids,
                    title: item.title,
                    overview: item.overview,
                    poster_path: item.poster_path,
                    release_date: item.release_date,
                    vote_average: item.vote_average
                }));

                // There is a duplicate entrie in the data, so i need to remove it
                const refinedData = filteredData.filter((movie, index, self) =>
                    index === self.findIndex((object) => (
                        object.id === movie.id
                    )
                ));

                setData(refinedData.slice(0, -9));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchPages();
    }, [data.length]);

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
                {loadedData.map(movie => (
                    <MoviePoster key={movie.id} {...movie} />
                ))}
            </div>
            <button className={styles.show_more_button} onClick={() => setViewAllData(!viewAllData)}>{viewAllData ? "Mostrar menos" : "Mostrar mais"}</button>
        </div>
    );
}
