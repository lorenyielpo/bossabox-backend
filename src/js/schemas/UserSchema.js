"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const ToolsSchema_1 = require("../schemas/ToolsSchema");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    tools: [ToolsSchema_1.ToolsSchema]
});
const userModel = mongoose.model('user', UserSchema);
exports.default = userModel;
//# sourceMappingURL=UserSchema.js.map