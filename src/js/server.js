"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv-safe");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const Login_1 = require("./helpers/Login");
const UserController_1 = require("./controllers/UserController");
const ToolsController_1 = require("./controllers/ToolsController");
const PORT = parseInt(process.env.PORT, 10) || 7000;
const server = express();
server.use(bodyParser());
server.use(cors());
server.use(bodyParser.json());
server.get('/', (request, response) => {
    response.send('Hello').status(200);
});
server.get('/v1/user', (request, response) => {
    UserController_1.default.getAllUser()
        .then(users => response.send(users).status(200))
        .catch(error => {
        if (error.name == 'CastError') {
            response.sendStatus(400);
        }
        else {
            response.sendStatus(500);
        }
    });
});
server.post('/v1/user', (request, response) => {
    UserController_1.default.addUser(request.body)
        .then(user => {
        const _id = user._id;
        response.send(_id).status(201);
    })
        .catch(error => {
        if (error.name === 'ValidationError') {
            response.sendStatus(400);
        }
        else {
            response.sendStatus(500);
        }
    });
});
server.delete('/v1/user/:idUser', (request, response) => {
    const idUser = request.params.idUser;
    UserController_1.default.deleteUser(idUser)
        .then(() => {
        response.sendStatus(200);
    })
        .catch(error => {
        if (error.name == 'CastError') {
            response.sendStatus(400);
        }
        else {
            response.sendStatus(500);
        }
    });
});
server.post('/v1/vuttr/login', (request, response) => {
    Login_1.default.login(request.body)
        .then(login => {
        response.send(login).status(200);
    })
        .catch(error => {
        if (error.name === 'ValidationError') {
            response.sendStatus(400);
        }
        else {
            response.sendStatus(500);
        }
    });
});
server.get('/v1/tools', (request, response) => {
    const tag = request.query.tag;
    if (!tag) {
        ToolsController_1.default.getTools()
            .then(tools => response.send(tools).status(200)).catch(error => {
            if (error.name == 'CastError') {
                response.sendStatus(400);
            }
            else {
                response.sendStatus(500);
            }
        });
    }
    else {
        ToolsController_1.default.getByTag(tag)
            .then(tools => response.send(tools).status(200))
            .catch(error => {
            if (error.name == 'CastError') {
                response.sendStatus(400);
            }
            else {
                response.sendStatus(500);
            }
        });
    }
});
server.post('/v1/tools', (request, response) => {
    const authHeader = request.get('authorization');
    let auth = false;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.PRIVATE_KEY, (error, decoded) => {
            if (error) {
                response.send(403);
            }
            else {
                auth = true;
            }
        });
    }
    else {
        response.send(401);
    }
    if (auth) {
        ToolsController_1.default.addTools(request.body)
            .then(tools => {
            const _id = tools._id;
            response.send(_id).status(201);
        })
            .catch(error => {
            if (error.name === 'ValidationError') {
                response.sendStatus(400);
            }
            else {
                response.sendStatus(500);
            }
        });
    }
});
server.delete('/v1/tools/:idTool', (request, response) => {
    const authHeader = request.get('authorization');
    let auth = false;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.PRIVATE_KEY, (error, decoded) => {
            if (error) {
                response.send(403);
            }
            else {
                auth = true;
            }
        });
    }
    else {
        response.send(401);
    }
    if (auth) {
        const idTool = request.params.idTool;
        ToolsController_1.default.deleteTools(idTool)
            .then(() => {
            response.sendStatus(200);
        })
            .catch(error => {
            if (error.name == 'CastError') {
                response.sendStatus(400);
            }
            else {
                response.sendStatus(500);
            }
        });
    }
});
server.listen(PORT);
console.info(`Rodando na porta ${PORT}`);
//# sourceMappingURL=server.js.map