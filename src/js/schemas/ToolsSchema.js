"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const ToolsSchema = new mongoose_1.Schema({
    _id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: Array, required: true },
});
const toolsModel = mongoose.model('tools', ToolsSchema);
exports.default = { toolsModel, ToolsSchema };
//# sourceMappingURL=ToolsSchema.js.map