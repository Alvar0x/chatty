import { ObjectId } from "bson";

type GroupType = {
    _id: ObjectId,
    name: string,
    users: ObjectId[],
    createdAt: Date
}

export default GroupType;