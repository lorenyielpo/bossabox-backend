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
const dotenvSafe = require("dotenv-safe");
const VUTTRRepository_1 = require("../repository/VUTTRRepository");
const UserSchema_1 = require("../schemas/UserSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
dotenvSafe.load;
VUTTRRepository_1.default();
class VUTTRController {
    static getAll() {
        return UserSchema_1.default.find((error, users) => {
            return users;
        });
    }
    getByTag(tag) {
        return UserSchema_1.default.findOne({
            tools: {
                tags: tag
            }
        });
    }
    static addUser(dataUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserSchema_1.default.findOne({
                email: dataUser.email
            });
            if (user) {
                throw new Error('This email already used');
            }
            const salt = bcrypt.genSaltSync(10);
            const criptoPassword = bcrypt.hashSync(dataUser.password, salt);
            dataUser.password = criptoPassword;
            const newUser = new UserSchema_1.default(dataUser);
            return newUser;
        });
    }
    login(dataLogin) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserSchema_1.default.findOne({
                email: dataLogin.email
            });
            const correctPassword = bcrypt.compareSync(dataLogin.password, user.password);
            if (user && correctPassword) {
                const token = jwt.sign({
                    email: user.email,
                    id: user._id
                }, process.env.PRIVATE_KEY);
                return { auth: true, token };
            }
            else {
                throw new Error('Incorrect data');
            }
        });
    }
    addTools() {
    }
    deleteTools() {
    }
}
exports.default = VUTTRController;
//# sourceMappingURL=VUTTRController.js.map