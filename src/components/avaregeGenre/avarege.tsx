import styles from "../../styles/metrics.module.css";

type AvaregeProps = {
    position: number;
    genreName: string;
    avarege: number;
};

export default function Avarege({ position, genreName, avarege }: AvaregeProps) {
    return (
        <p className={styles.metrics_entrie}>
            {position}. {genreName}: {avarege.toFixed(2)}
        </p>
    );
}
