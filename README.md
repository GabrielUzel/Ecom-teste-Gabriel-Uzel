# Ecom-teste-Gabriel-Uzel
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
<p align="justify"> 
Este projeto é uma pequena análise de um conjuto de 250 filmes que estão no top mais bem avaliados do site The Movie Database. Foi utilizado a linguagem Typescript e o framework Next.js para a construção do frontend do projeto. O projeto foi hospedado pelo <a href="https://ecom-teste-gabriel-uzel.vercel.app/">Vercel</a>. O objetivo deste trabalho é apresentar minhas habilidades com chamadas assícronas, manipulação de dados e, também, apresentação de resultados em uma interface polida.
</p>

## Instalação local
<p align="justify"> 
Apesar de estar hospedado em um serviço gratuito, aqui está o passo a passo para instalação e teste local:
</p>

1. Baixe o projeto e abra o terminal na raiz
2. Execute os comandos
```sh
$ npm install 
```

```sh
$ npm run dev
```
3. Abra o navegador em localhost:3000

## Decisões técnicas e uso de IA
### Fetches à API do TMDB
<p align="justify"> 
O primeiro ponto a ser desenvolvido foi obter a lista dos primeiros 250 do top mais bem avaliados do TMDB. Este serviço provém uma api que retorna uma página com 20 entradas de filmes, ou seja, para obter 250 filmes, deveremos fazer várias chamadas fetch e concatenar todos os resultados em um único objeto. O serviço do TMDB retorna várias informações sobre cada filme, mas para este projeto, apenas alguns foram selecionados: id, genre_ids (array com os ids dos gêneros do filme), title, poster_path (para mostrar no frontend o poster do filme), realese_date e vote_avarege. Para isto, usei um objeto do tipo type para definir quais atributos são necessários para este projeto:  
</p>
<img src="https://github.com/user-attachments/assets/7f97feed-220e-42b8-a020-5f3b9b1effd2"/>

<p align="justify"> 
O atributo position se refere a posição do filme no array, para que o frontend organize isso. O meu primeiro obstaculo foi realizar esses fetches múltiplos e concatenar seus resultados em um só objeto. Foi criado um array que é criado a partir de uma função que realiza um fetch baseado em um index. Este fetch realiza uma chamada de forma que une o index ao final de uma url base, uma vez que, as páginas que quero obter do TMDB são selecionadas pelo query param page={numero}.
</p>
<img src="https://github.com/user-attachments/assets/d3adfd29-fb45-4ee8-b817-07bdd78a40dc"/>

<p align="justify"> 
Para o desenvolvimento dessa implementação, utilizei o chatgpt:
</p>
<img src="https://github.com/user-attachments/assets/be7149b2-73f1-42f6-8a5e-09f0e5351ece"/>

```
// Resposta:
import { useEffect, useState } from 'react';

export default function MoviesPage() {
  const [data, setData] = useState(null); // or use [] if expecting an array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllPages = async () => {
      try {
        const totalPages = 13;
        const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY; // Store your API key in .env.local
        const baseUrl = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=';

        // Create array of fetch promises
        const fetchPromises = Array.from({ length: totalPages }, (_, i) =>
          fetch(${baseUrl}${i + 1}&api_key=${apiKey}).then(res => res.json())
        );

        // Wait for all requests to resolve
        const results = await Promise.all(fetchPromises);

        // Combine all movie results into a single array
        const allMovies = results.flatMap(page => page.results || []);

        setData(allMovies);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setData([]);
        setLoading(false);
      }
    };

    fetchAllPages();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No data</p>;

  return (
    <div>
      <h1>Top Rated Movies</h1>
      <ul>
        {data.map(movie => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

<p align="justify"> 
A seguir, me deparei com um pequeno problema no response obtido do TMBD, havia duas entradas para um filme específico. Tratei o objeto com a função filter, dessa forma:
</p>
<img src="https://github.com/user-attachments/assets/79e881c0-f4f1-4c8e-ba4d-d2e39a6517f5"/>

<p align="justify"> 
A partir disso, o próximo passo seria obter os filmes que estão no top trending de uma pesquisa semanal. Utilizando a mesma lógica, fiz chamadas a api buscando as 20 primeiras páginas. Além disso, utilizei uma api extra do TMDB. Essa outra api retorna uma lista de gêneros que o site admite, junto com seus respectivos ids e nomes. Fiz isso para mostrar no frontend, uma vez que pediu-se métricas relacionadas aos gêneros dos filmes, além de que as outras apis não retornavam o nome dos gêneros nos objetos dos filmes, e sim um array com seus ids.
</p>
<img src="https://github.com/user-attachments/assets/8ceb79ab-5284-4284-b68b-d2191bc2ac0c"/>

### React query
<p align="justify"> 
Os fetches estavam sendo realizados no componente principal por meio do hook useEffect. Porém, com o intuito de realizar caching dos dados, mudei para o react query, o qual lida automaticamente com este caching, com loadings e tratamento de erros. Abaixo estão as chamadas do react query, para cada chamada há um arquivo .ts específico, separei em outro arquivo para que o código fique mais limpo, mas nos campos "data", está sendo passadas as funções que realizam os fetches.
</p>
<img src="https://github.com/user-attachments/assets/1b6acee7-4bc0-4d34-8d88-14355c756e5f"/>

<p align="justify"> 
Os dados dos fetches foram passados como props para os componentes responsáveis por mostrar na tela o resultado obtido.
</p>

### Cálculo das métricas
1. Média de nota por gênero
<p align="justify"> 

</p>
