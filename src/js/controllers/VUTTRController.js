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
const VUTTRRepository_1 = require("../repository/VUTTRRepository");
const UserSchema_1 = require("../schemas/UserSchema");
const ToolsSchema_1 = require("../schemas/ToolsSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
VUTTRRepository_1.default();
let idLogado;
class VUTTRController {
    static getAll() {
        return UserSchema_1.default.find((error, users) => {
            return users;
        });
    }
    static getByTag(tag) {
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
            return newUser.save();
        });
    }
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
                    idLogado = user._id;
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
    static addTools(tool) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserSchema_1.default.findById(idLogado);
            const newTool = new ToolsSchema_1.toolsModel(tool);
            user.tools.push(newTool);
            return user.save();
        });
    }
    static deleteTools() {
    }
}
exports.default = VUTTRController;
//# sourceMappingURL=VUTTRController.js.map