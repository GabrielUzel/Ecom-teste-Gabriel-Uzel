'use client'

import { useQuery } from "@tanstack/react-query";
import getTopMovies from '@/fetch_scripts/getData';
import getTrendingMovies from '@/fetch_scripts/getTrending';
import getGenres from '@/fetch_scripts/getGenres';
import styles from "../styles/home.module.css";
import TopRatedMovies from "@/components/moviesList/topRatedMovies";
import AvaregeVotePerGenre from "@/components/avaregeGenre/avaregeVotePerGenre";
import MoviesPerGenre from "@/components/moviesPerGenre/moviesPerGenre";
import MoviesPerYear from '@/components/moviesPerYear/moviesPerYear';
import TrendingMovies from '@/components/moviesList/trendingMovies';
import Loading from "@/components/loading";
import Error from "@/components/error";

export default function Home() {
    const {
        data: topMovies,
        isLoading: isLoadingTop,
        isError: isErrorTop
    } = useQuery({
        queryFn: getTopMovies,
        queryKey: ["top_movies"],
        staleTime: 0
    });

    const {
        data: trendingMovies,
        isLoading: isLoadingTrending,
        isError: isErrorTrending
    } = useQuery({
        queryFn: getTrendingMovies,
        queryKey: ["trending_movies"],
        staleTime: 0
    });

    const {
        data: genres,
        isLoading: isLoadingGenres,
        isError: isErrorGenres
    } = useQuery({
        queryFn: getGenres,
        queryKey: ["genres"],
        staleTime: 0
    });

    if (isErrorTop || isErrorTrending || isErrorGenres) {
        return <Error />;
    }
    
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
                <br /><br />
                A priori, estãos listados os primeiros 250 filmes mais bem avaliados do TMDB. Em seguida, temos algumas métricas 
                dispostas em tabela, são estas a média de notas por gênero, a quantidade de filmes por gênero e a quantidade de
                filmes por ano. Por fim, está disposta uma lista com os filmes que estão, ao mesmo tempo, no top 250 mais bem avaliados
                e no top trending da semana.
            </p>
            <div className={styles.horizontal_line}></div>

            <div>
                <h2 className={styles.home_subtitle}>Top 250 filmes</h2>
                {isLoadingTop ? <Loading /> : <TopRatedMovies data={topMovies ?? []} />}
            </div>
            <div className={styles.horizontal_line}></div>

            <div>
                <h2 className={styles.home_subtitle}>Métricas</h2>
                <div className={styles.metrics_container}>
                    <div>
                        <h3 className={styles.metrics_subtitle}>Média de nota por gênero</h3>
                        <AvaregeVotePerGenre data={topMovies ?? []} genresData={genres ?? []} isLoading={isLoadingTop || isLoadingGenres}/>
                    </div>
                    <div>
                        <h3 className={styles.metrics_subtitle}>Quantidade de filmes por gênero</h3>
                        <MoviesPerGenre data={topMovies ?? []} genresData={genres ?? []} isLoading={isLoadingTop || isLoadingGenres}/>
                    </div>
                    <div>
                        <h3 className={styles.metrics_subtitle}>Quantidade de filmes por ano</h3>
                        {isLoadingTop ? <Loading /> : <MoviesPerYear data={topMovies ?? []}/>}
                    </div>
                </div>
            </div>
            <div className={styles.horizontal_line}></div>
            <div>
                <h2 className={styles.home_subtitle}>Filmes no top trending da semana</h2>
                {isLoadingTrending ? <Loading /> : <TrendingMovies topMoviesData={topMovies ?? []} trendingData={trendingMovies ?? []}/>} 
            </div>
        </div>
    );
}
