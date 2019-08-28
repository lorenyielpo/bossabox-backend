"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const VUTTRController_1 = require("./controllers/VUTTRController");
const PORT = parseInt(process.env.PORT, 10) || 7000;
const server = express();
server.use(bodyParser());
server.use(cors());
server.use(bodyParser.json());
server.get('/', (request, response) => {
    response.send('Hello').status(200);
});
server.get('/v1/vuttr', (request, response) => {
    VUTTRController_1.default.getAll()
        .then(vuttr => response.send(vuttr).status(200))
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
    VUTTRController_1.default.addUser(request.body)
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
            console.log(error);
        }
    });
});
server.listen(PORT);
console.info(`Rodando na porta ${PORT}`);
//# sourceMappingURL=server.js.map