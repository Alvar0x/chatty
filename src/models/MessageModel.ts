import pool from "@/database/connection";
import MessageType from "@/types/MessageType";
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { v4 } from "uuid";


class MessageModel {
    static async create({ id, content, userId, groupId, createdAt }: MessageType) {
        const [result] = await pool.execute<ResultSetHeader>(
            'insert into messages (id, content, userId, groupId, createdAt) values (uuid_to_bin(?), ?, uuid_to_bin(?), uuid_to_bin(?), ?)',
            [id, content, userId, groupId, createdAt]
        );

        if (!result.affectedRows) {
            throw new Error('Couldn\'t create the message');
        }

        return id;
    }

    static async getByGroup(groupId: string) {
        const [rows] = await pool.execute<RowDataPacket[][]>(
            `select bin_to_uuid(id) id, content, bin_to_uuid(userId) userId, bin_to_uuid(groupId) groupId, createdAt
                from messages
                where groupId = uuid_to_bin(?)
                order by createdAt asc`,
            [groupId]
        );
        return rows;
    }

    static async update(messageId: string, newMessageContent: string) {
        const [result] = await pool.execute<ResultSetHeader>(
            'update table messages set content = ? where id = uuid_to_bin(?)',
            [newMessageContent, messageId]
        );

        if (!result.affectedRows) {
            throw new Error('Couldn\'t update the message');
        }

        return messageId;
    }

    static async delete(messageId: string) {
        const [result] = await pool.execute<ResultSetHeader>(
            'delete from messages where id = uuid_to_bin(?)',
            [messageId]
        );

        if (!result.affectedRows) {
            throw new Error('Message not found');
        }

        return { deleted: true };
    }
}

export default MessageModel;