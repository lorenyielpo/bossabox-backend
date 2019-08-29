"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserSchema_1 = require("../schemas/UserSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
class Login {
    static login(dataLogin) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserSchema_1.default.findOne({
                email: dataLogin.email
            });
            if (user) {
                const correctPassword = bcrypt.compareSync(dataLogin.password, user.password);
                if (correctPassword) {
                    const token = jwt.sign({
                        email: user.email,
                        id: user._id
                    }, process.env.PRIVATE_KEY);
                    this.idLogado = user._id;
                    return { auth: true, token };
                }
                else {
                    throw new Error('Incorrect data');
                }
            }
            else {
                throw new Error('Incorrect data');
            }
        });
    }
}
exports.default = Login;
//# sourceMappingURL=Login.js.map