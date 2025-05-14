import styles from "../styles/home.module.css";
import TopRatedMovies from "@/components/top_rated_movies";
import AvarageVotePerGenre from "@/components/avarege_vote_per_genre";

export default function Home() {
    return (
        <div className={styles.main}>
            <h1 className={styles.home_title}>Consumo da api da The Movie Database</h1>

            <div className={styles.line}></div>
            <p className={styles.home_text}>
                Este projeto é uma pequena análise de um conjuto de 250 filmes que estão no top mais bem avaliados 
                do site The Movie Database. Foi utilizado a linguagem Typescript e o framework Next.js para a construção
                do frontend do projeto. O projeto foi hospedado pelo Vercel e o código fonte está disponível no meu<span>&nbsp;</span>
                <a className={styles.links} href="https://github.com/GabrielUzel/Ecom-teste-Gabriel-Uzel" target="_blank">github</a>.
                O objetivo deste trabalho é apresentar minhas habilidades com chamadas assícronas, manipulação de dados
                e, também, apresentação de resultados em uma interface polida.
            </p>
            <div className={styles.line}></div>

            <div className={styles.movies_list}>
                <h2 className={styles.home_subtitle}>Top 250 filmes</h2>
                <TopRatedMovies />
            </div>
            <div className={styles.line}></div>

            <div className={styles.metrics}>
                <h2>Métricas</h2>
                <AvarageVotePerGenre />
            </div>
        </div>
    );
}
