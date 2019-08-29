import jwt = require('jsonwebtoken');
import { Response, Request } from 'express';

class Auth{
    public authHeader: string;
    constructor(authorization: string){
        this.authHeader = authorization;
    }
    
    public authorize(){
        let auth: boolean = false;

        if (this.authHeader) {
            const token = this.authHeader.split(' ')[1];
            jwt.verify(token, <string>process.env.PRIVATE_KEY, (error, decoded) => {
                if (error) {
                    Response.error()
                } else {
                    auth = true;
                }
            })
        }

        return auth;
    }
}

export default Auth;