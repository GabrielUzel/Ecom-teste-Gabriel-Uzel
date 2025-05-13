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

export default function TopRatedMovies() {
    const [data, setData] = useState<MovieProps[]>([]);

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
    });

    return (
        <div className={styles.movies_list}>
            {data.map(movie => (
                <MoviePoster key={movie.id} {...movie} />
            ))}
        </div>
    );
}
