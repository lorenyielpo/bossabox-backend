"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const ToolsSchema_1 = require("../schemas/ToolsSchema");
const UserSchema = new mongoose_1.Schema({
    _id: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    username: { type: String, required: true },
    tools: [ToolsSchema_1.default]
});
const usarModel = mongoose.model('user', UserSchema);
exports.default = usarModel;
//# sourceMappingURL=UserSchema.js.map