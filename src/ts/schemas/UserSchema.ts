import mongoose = require('mongoose');
import { Schema } from 'mongoose';
import ToolsSchema from '../schemas/ToolsSchema'

const UserSchema = new Schema({
    _id: {type: String, required: true},
    email: {type: String, required: true},
    senha: {type: String, required: true},
    username: {type: String, required: true},
    tools: [ ToolsSchema ]
});

const usarModel = mongoose.model('user', UserSchema);

export default usarModel;