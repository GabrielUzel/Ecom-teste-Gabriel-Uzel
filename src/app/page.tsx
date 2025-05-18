'use client'

import { useEffect, useState } from 'react';
import styles from "../styles/home.module.css";
import TopRatedMovies from "@/components/Movies_list/top_rated_movies";
// import AvaregeVotePerGenre from "@/components/Avarege Genre/avarege_vote_per_genre";
import MoviesPerGenre from "@/components/Movies_per_Genre/movies_per_genre";
import MoviesPerYear from '@/components/Movies_per_Year/movies_per_year';
import type { MovieProps } from '../components/Props/movie_props';

export default function Home() {
    const [data, setData] = useState<MovieProps[]>([]);

    useEffect(() => {
        const fetchPages = async () => {
            try {
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
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

                setData(refinedData.slice(0, -10));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchPages();
    }, []);

    return (
        <div className={styles.main}>
            <h1 className={styles.home_title}>Consumo da api da The Movie Database</h1>

            <div className={styles.horizontal_line}></div>
            <p className={styles.home_text}>
                Este projeto é uma pequena análise de um conjuto de 250 filmes que estão no top mais bem avaliados 
                do site The Movie Database. Foi utilizado a linguagem Typescript e o framework Next.js para a construção
                do frontend do projeto. O projeto foi hospedado pelo Vercel e o código fonte está disponível no meu<span>&nbsp;</span>
                <a className={styles.links} href="https://github.com/GabrielUzel/Ecom-teste-Gabriel-Uzel" target="_blank">github</a>.
                O objetivo deste trabalho é apresentar minhas habilidades com chamadas assícronas, manipulação de dados
                e, também, apresentação de resultados em uma interface polida.
            </p>
            <div className={styles.horizontal_line}></div>

            <div>
                <h2 className={styles.home_subtitle}>Top 250 filmes</h2>
                <TopRatedMovies data={data} />
            </div>
            <div className={styles.horizontal_line}></div>

            <div>
                <h2 className={styles.home_subtitle}>Métricas</h2>
                <div className={styles.metrics_container}>
                    <div>
                        <h3 className={styles.metrics_subtitle}>Média de nota por gênero</h3>
                        {/* <AvaregeVotePerGenre data={data}/> */}
                    </div>
                    <div className={styles.vertical_line}></div>
                    <div>
                        <h3 className={styles.metrics_subtitle}>Quantidade de filmes por gênero</h3>
                        <MoviesPerGenre data={data}/>
                    </div>
                    <div>
                        <h3 className={styles.metrics_subtitle}>Quantidade de filmes por ano</h3>
                        <MoviesPerYear data={data}/>
                    </div>
                </div>
            </div>
            <div className={styles.horizontal_line}></div>

            <div>
                <h2 className={styles.home_subtitle}>Filmes no top trending da semana</h2>
            </div>
        </div>
    );
}
