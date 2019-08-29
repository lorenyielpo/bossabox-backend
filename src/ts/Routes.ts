import { Response, Request } from 'express';
import Login from './helpers/Login';
import UserController from './controllers/UserController';
import ToolsController from './controllers/ToolsController';
import jwt = require('jsonwebtoken');
import Auth from './helpers/Auth';

class Routes {
    public server: any;
    constructor(server: any){
        this.server = server;
    }

    public router() {
        this.server.get('/', (request: Request, response: Response) => {
            response.send('Hello').status(200);
        })

        this.server.get('/v1/user', (request: Request, response: Response) => {
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

        this.server.post('/v1/user', (request: Request, response: Response) => {
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

        this.server.delete('/v1/user/:idUser', (request: Request, response: Response) => {
            const idUser: string = request.params.idUser;
            UserController.deleteUser(idUser)
                .then(() => {
                    response.sendStatus(204);
                })
                .catch(error => {
                    if (error.name == 'CastError') {
                        response.sendStatus(400);
                    } else {
                        response.sendStatus(500);
                    }
                })
        })

        this.server.post('/v1/login', (request: Request, response: Response) => {
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

        this.server.get('/v1/tools', (request: Request, response: Response) => {
            const tag = request.query.tag;
            if (!tag) {
                ToolsController.getTools()
                    .then(tools => response.send(tools).status(200))
                    .catch(error => {
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


        this.server.post('/v1/tools', (request: Request, response: Response) => {

            const authorization: string = <string>request.get('authorization');
            const auth = new Auth(authorization);
            const authorized: boolean = auth.authorize()

            if (authorized) {

                ToolsController.addTools(request.body)
                    .then(tools => response.send(tools).status(201))
                    .catch(error => {
                        if (error.name === 'ValidationError') {
                            response.sendStatus(400);
                        } else {
                            response.sendStatus(500);
                        }
                    })
            }
        })

        this.server.delete('/v1/tools/:idTool', (request: Request, response: Response) => {
            const authorization: string = <string>request.get('authorization');
            const auth = new Auth(authorization);
            const authorized: boolean = auth.authorize()

            if (authorized) {
                const idTool: string = request.params.idTool;
                ToolsController.deleteTools(idTool)
                    .then(() => {
                        response.sendStatus(204);
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
    }
}

export default Routes;