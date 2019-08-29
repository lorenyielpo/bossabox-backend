import mongoose = require('mongoose');
import {ToolsSchema} from '../schemas/ToolsSchema'

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, auto: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    username: {type: String, required: true},
});

const userModel = mongoose.model('user', UserSchema);

export default userModel;