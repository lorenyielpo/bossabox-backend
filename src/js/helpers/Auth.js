"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
class Auth {
    constructor(authorization) {
        this.authHeader = authorization;
    }
    authorize() {
        let auth = false;
        if (this.authHeader) {
            const token = this.authHeader.split(' ')[1];
            jwt.verify(token, process.env.PRIVATE_KEY, (error, decoded) => {
                if (error) {
                    Response.error();
                }
                else {
                    auth = true;
                }
            });
        }
        return auth;
    }
}
exports.default = Auth;
//# sourceMappingURL=Auth.js.map