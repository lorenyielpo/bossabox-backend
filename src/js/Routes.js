"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Login_1 = require("./helpers/Login");
const UserController_1 = require("./controllers/UserController");
const ToolsController_1 = require("./controllers/ToolsController");
const Auth_1 = require("./helpers/Auth");
class Routes {
    constructor(server) {
        this.server = server;
    }
    router() {
        this.server.get('/', (request, response) => {
            response.send('Hello').status(200);
        });
        this.server.get('/v1/user', (request, response) => {
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
        this.server.post('/v1/user', (request, response) => {
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
        this.server.delete('/v1/user/:idUser', (request, response) => {
            const idUser = request.params.idUser;
            UserController_1.default.deleteUser(idUser)
                .then(() => {
                response.sendStatus(204);
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
        this.server.post('/v1/login', (request, response) => {
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
        this.server.get('/v1/tools', (request, response) => {
            const tag = request.query.tag;
            if (!tag) {
                ToolsController_1.default.getTools()
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
        this.server.post('/v1/tools', (request, response) => {
            const authorization = request.get('authorization');
            const auth = new Auth_1.default(authorization);
            const authorized = auth.authorize();
            if (authorized) {
                ToolsController_1.default.addTools(request.body)
                    .then(tools => response.send(tools).status(201))
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
        this.server.delete('/v1/tools/:idTool', (request, response) => {
            const authorization = request.get('authorization');
            const auth = new Auth_1.default(authorization);
            const authorized = auth.authorize();
            if (authorized) {
                const idTool = request.params.idTool;
                ToolsController_1.default.deleteTools(idTool)
                    .then(() => {
                    response.sendStatus(204);
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
    }
}
exports.default = Routes;
//# sourceMappingURL=Routes.js.map