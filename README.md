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
### Listagem do top 250 mais bem avaliados do site
<p align="justify"> 
O primeiro ponto a ser desenvolvido foi obter a lista dos primeiros 250 do top mais bem avaliados do TMDB. Este serviço provém uma api que retorna uma página com 20 entradas de filmes, ou seja, para obter 250 filmes, deveremos fazer várias chamadas fetch e concatenar todos os resultados em um único objeto. O serviço do TMDB retorna várias informações sobre cada filme, mas para este projeto, apenas alguns foram selecionados: id, genre_ids (array com os ids dos gêneros do filme), title, poster_path (para mostrar no frontend o poster do filme), realese_date e vote_avarege. Para isto, usei um objeto do tipo type para definir quais atributos são necessários para este projeto:  
</p>
![MovieProps](https://github.com/user-attachments/assets/b5cf69ec-7849-4f27-969a-cb20b24776b9)
