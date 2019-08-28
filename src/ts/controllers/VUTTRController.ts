import connect from '../repository/VUTTRRepository';
import userModel from '../schemas/UserSchema';
import { toolsModel } from '../schemas/ToolsSchema';
import bcrypt = require('bcryptjs');
import jwt = require('jsonwebtoken');
import Login from '../models/login';
import User from '../models/User';


connect();

class VUTTRController {
    public static getAll() {
        return userModel.find((error, users) => {
            return users;
        })
    }

    public getByTag(tag: string) {
        return userModel.findOne({
            tools: {
                tags: tag
            }
        })
    }

    public static async addUser(dataUser: any) {
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

    public async login(dataLogin: any) {
        const user: any = await userModel.findOne({
            email: dataLogin.email
        })

        const correctPassword = bcrypt.compareSync(dataLogin.password, user.password)

        if (user && correctPassword) {
            const token = jwt.sign({
                email: user.email,
                id: user._id
            },
                <string>process.env.PRIVATE_KEY
            )
            return { auth: true, token}
        } else {
            throw new Error('Incorrect data')
        }
    }

    public addTools() {

    }

    public deleteTools() {

    }
}





export default VUTTRController;