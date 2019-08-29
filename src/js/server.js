"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv-safe");
dotenv.config();
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const Routes_1 = require("./Routes");
const PORT = parseInt(process.env.PORT, 10) || 7000;
const server = express();
server.use(bodyParser());
server.use(cors());
server.use(bodyParser.json());
const rotas = new Routes_1.default(server);
rotas.router();
server.listen(PORT);
console.info(`Rodando na porta ${PORT}`);
//# sourceMappingURL=Server.js.map