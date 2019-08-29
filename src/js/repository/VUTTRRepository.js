"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
class VUTTRRepository {
    static connect() {
        mongoose.connect(this.MONGO_URL, { useNewUrlParser: true }, error => {
            if (error) {
                console.log('Falha ao conectar no mongo', error);
            }
            else {
                console.log('Conectado no MongoDB');
            }
        });
    }
}
VUTTRRepository.MONGO_URL = process.env.MONGODB_URI;
exports.default = VUTTRRepository;
//# sourceMappingURL=VUTTRRepository.js.map