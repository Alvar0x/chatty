import { ObjectId } from "bson";

type UserType = {
    _id: ObjectId,
    name: string,
    email: string,
    password: string,
    image: string,
    createdAt: Date
}

export default UserType;