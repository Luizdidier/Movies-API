<!--lint disable no-literal-urls-->
<p align="center">
  <a href="https://nodejs.org/">
    <img
      alt="Node.js"
      src="https://nodejs.org/static/images/logo-light.svg"
      width="100"
    />
  </a>
</p>

# Movies API

API parecida com o IMDB onde poderá se cadastrar como Usuario ou como Administrador.

- Usuário

  - Listar filmes.
  - Ver Detalhes dos filmes.
  - Votar nos filmes.
  - Atualizar informações do usuário logado.
  - Deletar usuário.

- Administrador
  - Listar filmes.
  - Ver Detalhes dos filmes.
  - Cadastrar Filmes e atualizar.
  - Ativar usuário deletado.

# Config

Na pasta do projeto contém o dump do banco de dados e a collection do postman junto com o environment tanto local quanto de demostração.

Demo: https://movie-node.herokuapp.com

# Getting Starter

Clone o projeto da master em uma pasta de sua escolha, instale o banco de dados PostgresSQL, no knexfile na raiz do projeto coloque as suas credencias do banco de dados local, depois rode os seguintes comandos.

```
  npm install -g nodemon
  npm install
  npm start
```
