import mongoose = require('mongoose');

class VUTTRRepository{
    
    static MONGO_URL: string = <string> process.env.MONGODB_URI;

    static connect (): void{
    mongoose.connect(<string> this.MONGO_URL,
        { useNewUrlParser: true},
        error => {
            if(error) {
                console.log('Falha ao conectar no mongo', error);
            } else {
                console.log('Conectado no MongoDB');
            }
        }); 
    }
}



export default VUTTRRepository;