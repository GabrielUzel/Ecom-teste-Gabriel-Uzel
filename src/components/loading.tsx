import styles from "../styles/home.module.css";

export default function Loading() {    
    return (
        <div className={styles.loadingOverlay}>
            <div className={styles.spinner}></div>
        </div>
    );
}
