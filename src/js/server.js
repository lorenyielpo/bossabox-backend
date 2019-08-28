"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 7000;
const server = express();
server.use(bodyParser());
server.use(cors());
server.use(bodyParser.json());
server.get('/', (request, response) => {
    response.send('Hello').status(200);
});
server.listen(PORT);
console.info(`Rodando na porta ${PORT}`);
//# sourceMappingURL=server.js.map