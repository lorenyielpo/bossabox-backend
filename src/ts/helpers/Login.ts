import userModel from '../schemas/UserSchema';
import bcrypt = require('bcryptjs');
import jwt = require('jsonwebtoken');

class Login {
    static idLogado: any;

    static async login(dataLogin: any) {
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
                this.idLogado = user._id;
                return { auth: true, token }
            } else {
                throw new Error('Incorrect data')
            }
        } else {
            throw new Error('Incorrect data')
        }
    }
}

export default Login;