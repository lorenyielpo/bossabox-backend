import mongoose = require('mongoose');

const MONGO_URL: string = <string> process.env.MONGODB_URI;

function connect (): void{
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