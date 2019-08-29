import dotenv = require('dotenv-safe');
dotenv.config();
import bodyParser = require('body-parser');
import express = require('express');
import cors = require('cors');
import Routes from './Routes';

const PORT= parseInt(<string>process.env.PORT, 10) || 7000;

const server = express();
server.use(bodyParser());
server.use(cors());
server.use(bodyParser.json());

const rotas = new Routes(server);
rotas.router();

server.listen(PORT);
console.info(`Rodando na porta ${PORT}`);
