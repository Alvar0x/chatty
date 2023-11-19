import pool from "@/database/connection";
import UserType from "@/types/UserType";
import { comparePasswords, hashPassword } from "@/utils/security";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { v4 } from "uuid";

class AuthModel {
    static async SignIn({ username, password }: { username: string, password: string }) {
        const [rows]: any[] = await pool.execute(
            'select bin_to_uuid(id) id, name, email, password, image, createdAt from users where name = ? or email = ?',
            [username, username]
        );

        if ((rows as []).length > 0) {
            const isSamePassword = await comparePasswords(password, rows[0].password);
            if (isSamePassword) {
                delete rows[0].password;
                return rows[0];
            } else {
                throw new Error('Wrong credentials');
            }
        } else {
            throw new Error('No users with that name / email');
        }
    }

    static async SignUp({ id, name, email, password, createdAt }: UserType) {
        id = v4();
        password = await hashPassword(password);

        const [result] = await pool.execute<ResultSetHeader>(
            'insert into users (id, name, email, password, createdAt) values (uuid_to_bin(?), ?, ?, ?, ?)',
            [id, name, email, password, createdAt]
        );

        if (!result.affectedRows) {
            throw new Error('Couldn\'t create the user');
        }

        return id;
    }
}

export default AuthModel;