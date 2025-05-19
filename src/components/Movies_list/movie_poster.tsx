import Image from "next/image";
import Link from 'next/link';
import styles from "../../styles/movies_list.module.css";
import type { MovieProps } from '../Props/movie_props';

export default function MoviePoster({ id, position, poster_path, title, vote_average }: MovieProps) {
    return (
        <div className={styles.movie_poster}>
            <Link href={`https://www.themoviedb.org/movie/${id}`}>
                <Image
                    src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                    width={200}
                    height={200}
                    alt={title}
                />
            </Link>
            <p className={styles.movie_title}>{position}. {title}</p>
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
