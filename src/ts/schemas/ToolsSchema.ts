import mongoose = require('mongoose');
import { Schema } from 'mongoose';

const ToolsSchema = new Schema({
    _id: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    tags: {type: Array, required: true},
});

const toolsModel = mongoose.model('tools', ToolsSchema);

export default {toolsModel, ToolsSchema};