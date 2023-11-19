import pool from "@/database/connection";
import GroupType from "@/types/GroupType";
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { v4 } from "uuid";

class GroupModel {
    static async create({ name, createdAt }: GroupType) {
        const newId = v4();

        const [result] = await pool.execute<ResultSetHeader>(
            'insert into `groups` (id, name, createdAt) values (uuid_to_bin(?), ?, ?)',
            [newId, name, createdAt]
        );

        if (!result.affectedRows) {
            throw new Error('Couldn\'t create the group');
        }

        return newId;
    }

    static async addUserToGroup(userId: string, groupId: string, role: 'user' | 'admin') {
        const [result] = await pool.execute<ResultSetHeader>(
            'insert into usersgroups (userId, groupId, role) values (uuid_to_bin(?), uuid_to_bin(?), ?)',
            [userId, groupId, role]
        );

        if (!result.affectedRows) {
            throw new Error('Couldn\'t add the user to the group');
        }

        return { userId, groupId };
    }

    static async getByUser(userId: string) {
        const [rows] = await pool.execute<RowDataPacket[][]>(
            'select bin_to_uuid(id) id, name, createdAt from `groups` where id in (select groupId from usersgroups where userId = uuid_to_bin(?))',
            [userId]
        );
        return rows;
    }

    static async getById(groupId: string) {
        const [rows] = await pool.execute<RowDataPacket[][]>(
            'select bin_to_uuid(id) id, name, createdAt from `groups` where id = uuid_to_bin(?)',
            [groupId]
        );

        if (rows.length === 0) {
            throw new Error('Group not found');
        }

        return rows[0];
    }

    static async update(groupId: string, newGroupName: string) {
        const [result] = await pool.execute<ResultSetHeader>(
            'update table `groups` set name = ? where id = uuid_to_bin(?)',
            [newGroupName, groupId]
        );

        if (!result.affectedRows) {
            throw new Error('Couldn\'t update the group');
        }

        return groupId;
    }

    static async delete(groupId: string) {
        const [result] = await pool.execute<ResultSetHeader>(
            'delete from `groups` where id = uuid_to_bin(?)',
            [groupId]
        );

        if (!result.affectedRows) {
            throw new Error('Group not found');
        }

        return { deleted: true };
    }
}

export default GroupModel;