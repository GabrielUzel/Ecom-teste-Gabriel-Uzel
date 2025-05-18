import styles from "../../styles/metrics.module.css";

type GenreProps = {
    position: number;
    genreName: string;
    count: number;
};

export default function Genre({ position, genreName, count }: GenreProps) {
    return (
        <p className={styles.metrics_entrie}>
            {position}. {genreName}: {count}
        </p>
    );
}
