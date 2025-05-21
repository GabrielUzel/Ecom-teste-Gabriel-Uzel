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


