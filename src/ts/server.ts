import express = require('express');
import {Response, Request} from 'express';
import bodyParser = require('body-parser');

import jwt = require('jsonwebtoken')

import cors = require('cors');
const PORT = process.env.PORT || 7000;

const server = express();

server.use(bodyParser());
server.use(cors());
server.use(bodyParser.json());

server.get('/',(request: Request, response: Response)=> {
    response.send('Hello').status(200);
})

server.listen(PORT);
console.info(`Rodando na porta ${PORT}`)


