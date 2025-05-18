import styles from "../../styles/movies_per_genre.module.css";

type GenreProps = {
    position: number;
    genreName: string;
    count: number;
};

export default function Genre({ position, genreName, count }: GenreProps) {
    return (
        <p className={styles.genre_entrie}>
            {position}. {genreName}: {count}
        </p>
    );
}
