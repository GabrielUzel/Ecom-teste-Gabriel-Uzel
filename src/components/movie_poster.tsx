import Image from "next/image";
import styles from "../styles/movie_poster.module.css";

type MovieProps = {
  id: number;
  genre_ids: number[];
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
};

export default function MoviePoster({ poster_path, title, vote_average }: MovieProps) {
    return (
        <div className={styles.movie_poster}>
            <Image
                src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                width={200}
                height={200}
                alt={title}
            />
            <p className={styles.movie_title}>{title}</p>
            <div className={styles.vote_average}>
                <Image
                    src={"star-solid.svg"}
                    width={15}
                    height={15}
                    alt={title}
                />
                <p>{vote_average.toFixed(2)}</p>
            </div>
        </div>
    );
}
