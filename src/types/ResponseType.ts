import { RowDataPacket } from "mysql2";
import GroupType from "./GroupType";
import MessageType from "./MessageType";
import UserType from "./UserType";

type ResponseType = {
    status: number,
    message: string,
    data?: any | any[]
}

export default ResponseType;