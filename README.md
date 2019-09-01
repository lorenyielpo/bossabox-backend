# API RESTFUL VUTTR
API RESTFUL desenvolvida para fazer GET, POST, DELETE.


## Ferramentas usadas:
- [Node.js](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [JWT](https://www.npmjs.com/package/jsonwebtoken)
- [Concurrently](https://www.npmjs.com/package/concurrently)
- [Swagger](https://swagger.io/)
- [Dotenv-safe](https://www.npmjs.com/package/dotenv-safe)

## Como baixar o projeto?

Clone o repositório em sua máquina, entre na pasta e abra o terminal e rode os seguintes comandos:

# Instalando o projeto:

## Para baixar as dependências 
```
npm install
```

## Para iniciar o server no localhost
```
npm run watch-node
```

## Caso queira alterar alguma coisa e deseja que o servidor suba sozinho após a compilação do TS
```
npm run start
```

# Caso queira iniciar sua aplicação já com dados nas collections, abra o mongo shell e execute os seguintes comandos:
```
show dbs
use vuttr
db.tools.insertMany([
{
        title: "Notion",
        link: "https://notion.so",
        description: "All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ",
        tags: [
            "organization",
            "planning",
            "collaboration",
            "writing",
            "calendar"
        ],
        author: "mariaa"
    },
    {
        title: "json-server",
        link: "https://github.com/typicode/json-server",
        description: "Fake REST API based on a json schema. Useful for mocking and creating APIs for front-end devs to consume in coding challenges.",
        tags: [
            "api",
            "json",
            "schema",
            "node",
            "github",
            "rest"
        ],
        author: "josseee"
    },
    {
        title: "fastify",
        link: "https://www.fastify.io/",
        description: "Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.",
        tags: [
            "web",
            "framework",
            "node",
            "http2",
            "https",
            "localhost"
        ],
        author: "gabiz"
    },
    {
        "title": "hotel",
        "link": "https://github.com/typicode/hotel",
        "description": "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
        "tags":["node", "organizing", "webapps", "domain", "developer", "https", "proxy"],
        "author": "gabiz"
    }
])
db.users.insertMany([
    {
        "email": "email.jos@email.com",
        "senha": "senha1234",
        "username": "josseee"
    },
    {
        "email": "email.maa@email.com",
        "senha": "senha1234",
        "username": "mariaa"
    },
    {
        "email": "email.zgabi@email.com",
        "senha": "senha1234",
        "username": "gabiz"
    },
    {
        "email": "email.lory@email.com",
        "senha": "senha1234",
        "username": "lory.lo"
    }
])
```

Sugestões serão sempre bem-vindas!
