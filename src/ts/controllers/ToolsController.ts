import VUTTRRepository from '../repository/VUTTRRepository';
import userModel from '../schemas/UserSchema';
import toolsModel from '../schemas/ToolsSchema';
import Login from '../helpers/Login';

VUTTRRepository.connect();

function getByTag(tag: string) {
    return toolsModel.find({
        "tags": { $in: `${tag}` }
    });
}

async function addTools(tool: any) {
    const user: any = await userModel.findById(Login.idLogado);

    tool.author = user.username;
    const newTool = new toolsModel(tool);

    return newTool.save();
}

function getTools() {
    return toolsModel.find((error, tools) => {
        return tools;
    })
}

function deleteTools(idTool: string) {
    return toolsModel.findByIdAndDelete(idTool);
}


export default {
    getByTag,
    addTools,
    getTools,
    deleteTools
}