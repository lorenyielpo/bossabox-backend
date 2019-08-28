import express = require('express');
import {Response, Request} from 'express';
import bodyParser = require('body-parser');
import cors = require('cors');
import jwt = require('jsonwebtoken')
import VUTTRController from './controllers/VUTTRController';
const PORT = parseInt(<string>process.env.PORT, 10) || 7000;

const server = express();

server.use(bodyParser());
server.use(cors());
server.use(bodyParser.json());

// const controller = new VUTTRController;

server.get('/',(request: Request, response: Response)=> {
    response.send('Hello').status(200);
})

server.get('/v1/vuttr', (request: Request, response: Response)=> {
    // controller.getAll()
    VUTTRController.getAll()
    .then(vuttr => response.send(vuttr).status(200))
    .catch(error => {
        if(error.name == 'CastError'){
            response.sendStatus(400);
        } else {
            response.sendStatus(500)
        }
    })
})

server.post('/v1/user', (request: Request, response: Response)=>{
    VUTTRController.addUser(request.body)
    .then(user => {
        const _id = user._id;
        response.send(_id).status(201);
    })
    .catch(error => {
        if (error.name === 'ValidationError'){
            response.sendStatus(400);
        } else {
            response.sendStatus(500);
            console.log(error)
        }
    })
})

server.listen(PORT);
console.info(`Rodando na porta ${PORT}`)


