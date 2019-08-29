import dotenv = require('dotenv-safe');
dotenv.config();
import express = require('express');
import bodyParser = require('body-parser');
import cors = require('cors');
import { Response, Request } from 'express';
import jwt = require('jsonwebtoken');
import Login from './helpers/Login';
import UserController from './controllers/UserController';
import ToolsController from './controllers/ToolsController';

const PORT = parseInt(<string>process.env.PORT, 10) || 7000;

const server = express();

server.use(bodyParser());
server.use(cors());
server.use(bodyParser.json());

server.get('/', (request: Request, response: Response) => {
    response.send('Hello').status(200);
})

server.get('/v1/user', (request: Request, response: Response) => {
    UserController.getAllUser()
        .then(users => response.send(users).status(200))
        .catch(error => {
            if (error.name == 'CastError') {
                response.sendStatus(400);
            } else {
                response.sendStatus(500);
            }
        })
})

server.post('/v1/user', (request: Request, response: Response) => {
    UserController.addUser(request.body)
        .then(user => {
            const _id = user._id;
            response.send(_id).status(201);
        })
        .catch(error => {
            if (error.name === 'ValidationError') {
                response.sendStatus(400);
            } else {
                response.sendStatus(500);
            }
        })
})

server.delete('/v1/user/:idUser', (request: Request, response: Response) => {
    const idUser: string = request.params.idUser;
    UserController.deleteUser(idUser)
        .then(() => {
            response.sendStatus(200);
        })
        .catch(error => {
            if (error.name == 'CastError') {
                response.sendStatus(400);
            } else {
                response.sendStatus(500);
            }
        })
})

server.post('/v1/vuttr/login', (request: Request, response: Response) => {
    Login.login(request.body)
        .then(login => {
            response.send(login).status(200);
        })
        .catch(error => {
            if (error.name === 'ValidationError') {
                response.sendStatus(400);
            } else {
                response.sendStatus(500);
            }
        })
})

server.get('/v1/tools', (request: Request, response: Response) => {
    const tag = request.query.tag;
    if (!tag) {
        ToolsController.getTools()
            .then(tools => response.send(tools).status(200)).catch(error => {
                if (error.name == 'CastError') {
                    response.sendStatus(400);
                } else {
                    response.sendStatus(500);
                }
            })
    } else {
        ToolsController.getByTag(tag)
            .then(tools => response.send(tools).status(200))
            .catch(error => {
                if (error.name == 'CastError') {
                    response.sendStatus(400);
                } else {
                    response.sendStatus(500);
                }
            })
    }

})


server.post('/v1/tools', (request: Request, response: Response) => {

    const authHeader = request.get('authorization');
    let auth = false;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, <string>process.env.PRIVATE_KEY, (error, decoded) => {
            if (error) {
                response.send(403);
            } else {
                auth = true;
            }
        })
    } else {
        response.send(401);
    }

    if (auth) {

        ToolsController.addTools(request.body)
            .then(tools => {
                const _id = tools._id;
                response.send(_id).status(201);
            })
            .catch(error => {
                if (error.name === 'ValidationError') {
                    response.sendStatus(400);
                } else {
                    response.sendStatus(500);
                }
            })
    }
})

server.delete('/v1/tools/:idTool', (request: Request, response: Response) => {

    const authHeader = request.get('authorization');
    let auth = false;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, <string>process.env.PRIVATE_KEY, (error, decoded) => {
            if (error) {
                response.send(403);
            } else {
                auth = true;
            }
        })
    } else {
        response.send(401);
    }

    if (auth) {
        const idTool: string = request.params.idTool;
        ToolsController.deleteTools(idTool)
            .then(() => {
                response.sendStatus(200);
            })
            .catch(error => {
                if (error.name == 'CastError') {
                    response.sendStatus(400);
                } else {
                    response.sendStatus(500);
                }
            })
    }
})


server.listen(PORT);
console.info(`Rodando na porta ${PORT}`);