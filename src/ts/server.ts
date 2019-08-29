import dotenv = require('dotenv-safe');
dotenv.config();
import express = require('express');
import bodyParser = require('body-parser');
import cors = require('cors');
import { Response, Request } from 'express';
import VUTTRController from './controllers/VUTTRController';
import jwt = require('jsonwebtoken');



const PORT = parseInt(<string>process.env.PORT, 10) || 7000;

const server = express();

server.use(bodyParser());
server.use(cors());
server.use(bodyParser.json());

server.get('/', (request: Request, response: Response) => {
    response.send('Hello').status(200);
})

server.get('/v1/user', (request: Request, response: Response) => {
    VUTTRController.getAllUser()
        .then(vuttr => response.send(vuttr).status(200))
        .catch(error => {
            if (error.name == 'CastError') {
                response.sendStatus(400);
            } else {
                response.sendStatus(500)
            }
        })
})

server.post('/v1/user', (request: Request, response: Response) => {
    VUTTRController.addUser(request.body)
        .then(user => {
            const _id = user._id;
            response.send(_id).status(201);
        })
        .catch(error => {
            if (error.name === 'ValidationError') {
                response.sendStatus(400);
            } else {
                response.sendStatus(500);
                console.log(error)
            }
        })
})

server.post('/v1/vuttr/login', (request: Request, response: Response) => {
    VUTTRController.login(request.body)
        .then(login => {
            response.send(login).status(200);
        })
        .catch(error => {
            if (error.name === 'ValidationError') {
                response.sendStatus(400)
            } else {
                response.sendStatus(500)
                console.log(error)
            }
        })
})

server.post('/v1/tools', (request: Request, response: Response) => {
    VUTTRController.addTools(request.body)
        .then(tools => {
            const _id = tools._id;
            response.send(_id).status(201);
        })
        .catch(error => {
            if (error.name === 'ValidationError') {
                response.sendStatus(400);
            } else {
                response.sendStatus(500);
                console.log(error)
            }
        })
})

server.get('/v1/tools', (request: Request, response: Response) => {
    const tag = request.query.tag;
    if (!tag) {
        VUTTRController.getAllTools()
            .then(tools => response.send(tools).status(200)).catch(error => {
                if (error.name == 'CastError') {
                    response.sendStatus(400);
                } else {
                    response.sendStatus(500)
                }
            })
    } else {
        VUTTRController.getByTag(tag)
            .then(tools => response.send(tools).status(200))
            .catch(error => {
                if (error.name == 'CastError') {
                    response.sendStatus(400);
                } else {
                    response.sendStatus(500)
                }
            })
    }

})


// server.get('/v1/tools?:tag', (request: Request, response: Response) =>{

//     

server.delete('/v1/tools/:idTool', (request: Request, response: Response) => {
    const idTool: string = request.params.idTool;
    VUTTRController.deleteTools(idTool)
        .then(() => {
            response.sendStatus(200)
        })
        .catch(error => {
            if (error.name == 'CastError') {
                response.sendStatus(400);
            } else {
                response.sendStatus(500)
            }
        })
})


server.listen(PORT);
console.info(`Rodando na porta ${PORT}`)

export default server;
