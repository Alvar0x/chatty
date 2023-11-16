import GroupType from "@/types/server/GroupType";
import { ObjectId, Collection } from 'mongodb';

class GroupModel {
    static async create(groupCollection: Collection<GroupType>, group: GroupType) {
        const result = await groupCollection.insertOne(group);
        return result;
    }

    static async getAll(groupCollection: Collection<GroupType>) {
        const result = await groupCollection.find().toArray();
        return result;
    }

    static async getById(groupCollection: Collection<GroupType>, groupId: string) {
        const result = await groupCollection.findOne({ _id: new ObjectId(groupId) });
        return result;
    }

    static async getByName(groupCollection: Collection<GroupType>, name: string) {
        const result = await groupCollection.findOne({ name });
        return result;
    }

    static async getByUser(groupCollection: Collection<GroupType>, userId: string) {
        const result = groupCollection.find({ users: { $elemMatch: { $eq: new ObjectId(userId) } } }).sort({ createdAt: 1 }).toArray();
        return result;
    }

    static async update(groupCollection: Collection<GroupType>, groupId: string, newGroupName: string) {
        const result = await groupCollection.updateOne({ _id: new ObjectId(groupId) }, {
            $set: { name: newGroupName }
        });
        return result;
    }

    static async delete(groupCollection: Collection<GroupType>, groupId: string) {
        const result = await groupCollection.deleteOne({ _id: new ObjectId(groupId) });
        return result;
    }
}

export default GroupModel;