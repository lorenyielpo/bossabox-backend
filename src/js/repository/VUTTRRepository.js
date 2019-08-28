"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenvSafe = require("dotenv-safe");
dotenvSafe.load;
const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/vuttr';
function connect() {
    mongoose.connect(MONGO_URL, { useNewUrlParser: true }, error => {
        if (error) {
            console.log('Falha ao conectar no mongo', error);
        }
        else {
            console.log('Conectado no MongoDB');
        }
    });
}
exports.default = connect;
//# sourceMappingURL=VUTTRRepository.js.map