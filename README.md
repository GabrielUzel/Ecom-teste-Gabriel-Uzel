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
#### Média de nota por gênero
<p align="justify"> 
Para caulcular a média das notas para cada gênero, foi criado um hashmap em que a chave é uma string que indica o nome do gênero e um array que contém 2 valores, a quantidade de filmes calculada e a soma das notas totais para estes filmes. Para calcular a média, basta dividir este valor total pelo número de filmes encontrados. Para obter a string que indica o nome do gênero, foi criada uma função que lê o objeto que contém os nomes e retorna um nome específico dada um id passado como atributo desta função.
</p>
<img src="https://github.com/user-attachments/assets/dac4c8d2-ae2e-4c7c-a75c-4d7447512e0e"/>

#### Quantidade de filmes por gênero
<p align="justify"> 
Utilizando um hashmap novamente, foi salvo como chave o nome do gênero e a quantidade de vezes que este aparece no objeto, basta percorrer a lista de filmes e seus gêneros e somar com 1 a cada gênero encontrado. Também foi utilizada a função que retorna o nome do gênero como uma string.
</p>
<img src="https://github.com/user-attachments/assets/6ad0d7a5-ee4a-4c09-9dbc-5245ffdac5c6"/>

#### Quantidade de filmes por ano
<p align="justify"> 
Esta métrica foi a mais simples de ser implementada, basta utilizar outro hashmap em que a chave representa um ano específico e o valor representa a quantidade de filmes lançados naquele ano. O ano foi obtido fazendo um .slice no atributo de "realese_year" de cada filme.
</p>
<img src="https://github.com/user-attachments/assets/7acd261e-4e94-4436-a957-4927dac5e81e"/>

### Filmes no top trending
<p align="justify"> 
Por fim, o último requisito do teste foi apresentar a quantidade de filmes que estão, não só, no top 250 mais bem avaliados, como também estão presentes no top trending semanal. Para isso, bastou ler os dois objetos, o json de filmes no top 50 e o json que contém os filmes no top trending, e verificar quais deles estão presentes nos dois json fazendo uma busca por seus ids. Foi utilizado o deepseek para obter uma forma mais otimizada para fazer isso, pois a princípio pensei em utilizar um loop aninhado, entretanto, esta não é a solução mais otimizada. Foi utilizado um set, em que pegava os ids do objeto de trending e os armazenada, então foi criado um novo objeto que faz um filter no objeto de top filmes e seleciona aqueles que possuem id que estão neste set criado. Para obter a quantidade de filmes, basta pegar o tamanho desse novo objeto.
</p>
<img src="https://github.com/user-attachments/assets/49688e02-60f3-4877-bfab-cfb8d415926b"/>

### Considerações finais
<p align="justify"> 
Assim, com os componentes recebendo os dados dos fetches realizados e tratando-os, basta retornar na tela os dados organizados em flex-box e grids. Os grids foram utilizados para as métricas, para melhor ordenação e o flex-box foi utilizado para mostrar a lista de filmes, tanto dos 25 filmes mais bem avaliados quanto os filmes que estão no top e nos trendings, juntamente com seus pôsteres.
</p>
