import { ObjectId } from "bson";

class Tools {
    _id: ObjectId;
    title: string;
    description: string;
    tags: Array<string>;
}

export default Tools;