import connect from '../repository/VUTTRRepository';
import userModel from '../schemas/UserSchema';
import bcrypt = require('bcryptjs');

connect();

class UserController {
    

    static getAllUser() {
        return userModel.find((error, users) => {
            return users;
        })
    }

    static async addUser(dataUser: any) {
        const user = await userModel.findOne({
            email: dataUser.email
        })

        if (user) {
            throw new Error('This email already used');
        }

        const salt = bcrypt.genSaltSync(10);
        const criptoPassword = bcrypt.hashSync(dataUser.password, salt);
        dataUser.password = criptoPassword;

        const newUser = new userModel(dataUser);
        return newUser.save();
    }

    static deleteUser(id: string) {
            return userModel.findByIdAndDelete(id)
    }
}

export default UserController;