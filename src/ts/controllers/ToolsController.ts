import connect from '../repository/VUTTRRepository';
import userModel from '../schemas/UserSchema';
import toolsModel from '../schemas/ToolsSchema';
import Login from '../helpers/Login';

connect();

class ToolsController {

    static getByTag(tag: string) {
        return toolsModel.find({
            "tags": {$in: `${tag}`}
        });
    }

    static async addTools(tool: any) {
        const user: any = await userModel.findById(Login.idLogado);
        
        tool.author = user.username;
        const newTool = new toolsModel(tool);

        return newTool.save()
    }

    static getTools(){
        return toolsModel.find((error, tools) => {
            return tools;
        })
    }

    static deleteTools(idTool: string) {
        return toolsModel.findByIdAndDelete(idTool)
    }
}

export default ToolsController;