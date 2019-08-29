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
const bcrypt = require("bcryptjs");
VUTTRRepository_1.default();
function getAllUser() {
    return UserSchema_1.default.find((error, users) => {
        return users;
    });
}
function addUser(dataUser) {
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
function deleteUser(id) {
    return UserSchema_1.default.findByIdAndDelete(id);
}
exports.default = {
    getAllUser,
    addUser,
    deleteUser
};
//# sourceMappingURL=UserController.js.map