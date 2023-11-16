import MessageType from "@/types/server/MessageType";
import { ObjectId, Collection } from 'mongodb';

class MessageModel {
    static async create(messageCollection: Collection<MessageType>, message: MessageType) {
        const result = await messageCollection.insertOne(message);
        return result;
    }

    static async getByGroup(messageCollection: Collection<MessageType>, groupId: string, fromDate: string | null) {
        const result = await messageCollection.find({
            groupId: new ObjectId(groupId),
            createdAt: { $gt: fromDate ? new Date(fromDate) : new Date('2023-11-04') }
        }).sort({ createdAt: 1 }).toArray();
        return result;
    }

    static async update(messageCollection: Collection<MessageType>, messageId: string, newMessage: string) {
        const result = await messageCollection.updateOne({ _id: new ObjectId(messageId) }, {
            $set: { content: newMessage }
        });
        return result;
    }

    static async delete(messageCollection: Collection<MessageType>, messageId: string) {
        const result = await messageCollection.deleteOne({ _id: new ObjectId(messageId) });
        return result;
    }
}

export default MessageModel;