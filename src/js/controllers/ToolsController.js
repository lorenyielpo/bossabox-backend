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
const Login_1 = require("../helpers/Login");
VUTTRRepository_1.default();
class ToolsController {
    static getByTag(tag) {
        return ToolsSchema_1.default.find({
            "tags": { $in: `${tag}` }
        });
    }
    static addTools(tool) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserSchema_1.default.findById(Login_1.default.idLogado);
            tool.author = user.username;
            const newTool = new ToolsSchema_1.default(tool);
            return newTool.save();
        });
    }
    static getTools() {
        return ToolsSchema_1.default.find((error, tools) => {
            return tools;
        });
    }
    static deleteTools(idTool) {
        return ToolsSchema_1.default.findByIdAndDelete(idTool);
    }
}
exports.default = ToolsController;
//# sourceMappingURL=ToolsController.js.map