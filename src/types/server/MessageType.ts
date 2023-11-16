import { ObjectId } from "bson";

type MessageType = {
    _id: ObjectId,
    content: string,
    groupId: ObjectId,
    userId: ObjectId,
    createdAt: Date
}

export default MessageType;