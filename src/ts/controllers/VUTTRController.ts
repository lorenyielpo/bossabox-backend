import connect from '../repository/VUTTRRepository';
import userModel from '../schemas/UserSchema';
import toolsModel from '../schemas/ToolsSchema';
import bcrypt = require('bcryptjs');
import jwt = require('jsonwebtoken');
import { ObjectId } from 'bson';


connect();

let idLogado: ObjectId;

class VUTTRController {
    

    public static getAllUser() {
        return userModel.find((error, users) => {
            return users;
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

    public static deleteUser(id: string) {
            return userModel.findByIdAndDelete(id)
    }

    public static async login(dataLogin: any) {
        const user: any = await userModel.findOne({
            email: dataLogin.email
        })

        if (user) {
            const correctPassword = bcrypt.compareSync(dataLogin.password, user.password);

            if (correctPassword) {
                const token = jwt.sign(
                    {
                    email: user.email,
                    id: user._id
                },
                    <string>process.env.PRIVATE_KEY
                )
                idLogado = user._id;
                return { auth: true, token }
            } else {
                throw new Error('Incorrect data')
            }
        } else {
            throw new Error('Incorrect data')
        }
    }

    public static getByTag(tag: string) {
        return toolsModel.find({
            "tags": {$in: `${tag}`}
        });
    }

    public static async addTools(tool: any) {
        const user: any = await userModel.findById(idLogado);
        
        tool.author = user.username;
        const newTool = new toolsModel(tool);

        return newTool.save()
    }

    public static getAllTools(){
        return toolsModel.find((error, tools) => {
            return tools;
        })
    }

    public static deleteTools(idTool: string) {
        return toolsModel.findByIdAndDelete(idTool)
    }
}





export default VUTTRController;