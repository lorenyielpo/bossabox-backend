import dotenvSafe = require('dotenv-safe');
dotenvSafe.load;

import mongoose = require('mongoose');

const MONGO_URL = <string> process.env.MONGODB_URI || 'mongodb://localhost:27017/vuttr';

function connect (){
    mongoose.connect(<string> MONGO_URL,
        { useNewUrlParser: true},
        error => {
            if(error) {
                console.log('Falha ao conectar no mongo', error)
            } else {
                console.log('Conectado no MongoDB')
            }
        });
}

export default connect;