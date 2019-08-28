import { ObjectId } from "bson";
import Tools from "./Tools";

class User {
    _id: ObjectId;
    email: string;
    password: string;
    username: string;
    tools: Array<Tools>;
}

export default User;