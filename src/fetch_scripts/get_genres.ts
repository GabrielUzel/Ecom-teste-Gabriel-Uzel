import type { GenreProps } from '@/components/Props/genre_props';

async function getData(): Promise<GenreProps[]> {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
        }
    };

    try {
        const response = await fetch("https://api.themoviedb.org/3/genre/movie/list?language=pt-br", options);
        const data = await response.json();
        
        return data.genres;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    } 
}

export default async function getGenres(): Promise<GenreProps[]> {
    const data = await getData();
    return data;
}
