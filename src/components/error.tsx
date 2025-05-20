import styles from "../styles/error.module.css";

export default function Error() {    
    return (
        <div className={styles.error_container}>
            <h1 className={styles.error_title}>404</h1>
            <p className={styles.error_text}>Houve um erro, tente novamente mais tarde</p>
        </div>
    );
}
