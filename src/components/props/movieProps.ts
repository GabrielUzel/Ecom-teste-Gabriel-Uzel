export type MovieProps = {
    id: number;
    genre_ids: number[];
    poster_path: string;
    release_date: string;
    title: string;
    vote_average: number;
    position?: number;
};