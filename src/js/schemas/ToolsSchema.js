"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ToolsSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: Array, required: true },
    author: { type: String }
});
const toolsModel = mongoose.model('tools', ToolsSchema);
exports.default = toolsModel;
//# sourceMappingURL=ToolsSchema.js.map