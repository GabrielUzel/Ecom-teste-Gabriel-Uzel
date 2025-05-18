export type MovieProps = {
    id: number;
    genre_ids: number[];
    overview: string;
    poster_path: string;
    release_date: string;
    title: string;
    vote_average: number;
    position?: number;
};