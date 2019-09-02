"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
});
const userModel = mongoose.model('users', UserSchema, 'users');
exports.default = userModel;
//# sourceMappingURL=UserSchema.js.map