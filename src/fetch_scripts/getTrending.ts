import { TrendingProps } from '@/components/props/trendingProps';

async function getData(): Promise<TrendingProps[]> {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
        }
    };

    try {
        const totalPages = 20;
        const baseUrl = 'https://api.themoviedb.org/3/trending/movie/week?language=en-US&page=';

        const fetchPromises = Array.from({ length: totalPages }, (_, i) =>
            fetch(`${baseUrl}${i + 1}`, options)
            .then(res => res.json())
        );

        const results = await Promise.all(fetchPromises);
        const fullData = results.flatMap(page => page.results || []);
        const filteredData = fullData.map((item: { id: number; }) => ({ id: item.id }));

        // There is a duplicate entrie in the data, so i need to remove it
        const refinedData = filteredData.filter((movie, index, self) =>
            index === self.findIndex((object) => (
                object.id === movie.id
            )
        ));

        return refinedData;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

export default async function getTrendingMovies(): Promise<TrendingProps[]> {
    const data = await getData();
    return data;
}
