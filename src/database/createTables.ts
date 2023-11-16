import { createClient } from "@libsql/client";

const db = createClient({
    url: 'libsql://needed-darkhawk-alvar0x.turso.io',
    authToken: process.env.NEXT_PUBLIC_DB_TOKEN
});

export async function createUsersTable() {
    try {
        await db.execute(`
            create table if not exists users (
                id text primary key,
                username text unique not null,
                password text not null,
                created_at text not null
            );
        `);
    } catch (error) {
        throw new Error(String(error));
    }
}

export async function createGroupsTable() {
    try {
        await db.execute(`
            create table if not exists groups (
                id text primary key,
                name text not null,
                created_at text not null
            );
        `);
    } catch (error) {
        throw new Error(String(error));
    }
}

export async function createMessagesTable() {
    try {
        await db.execute(`
            create table if not exists messages (
                id text primary key,
                content text not null,
                group_id text not null,
                user_id text not null,
                created_at text not null,
                foreign key (group_id) references groups(id),
                foreign key (user_id) references users(id)
            );
        `);
    } catch (error) {
        throw new Error(String(error));
    }
}

export async function createUserMessagesTable() {
    try {
        await db.execute(`
            create table if not exists user_messages (
                user_id text not null,
                message_id text not null,
                foreign key (user_id) references users(id),
                foreign key (message_id) references messages(id)
            );
        `);
    } catch (error) {
        throw new Error(String(error));
    }
}

export async function createGroupMessagesTable() {
    try {
        await db.execute(`
            create table if not exists group_messages (
                group_id text not null,
                message_id text not null,
                foreign key (group_id) references groups(id),
                foreign key (message_id) references messages(id)
            );
        `);
    } catch (error) {
        throw new Error(String(error));
    }
}

export async function createGroupUsersTable() {
    try {
        await db.execute(`
            create table if not exists group_users (
                group_id text not null,
                user_id text not null,
                joined_at text not null,
                foreign key (group_id) references groups(id),
                foreign key (user_id) references users(id)
            );
        `);
    } catch (error) {
        throw new Error(String(error));
    }
}

export async function deleteUsersTable() {
    try {
        await db.execute(`drop table if exists users`);
    } catch (error) {
        throw new Error(String(error));
    }
}

export async function deleteGroupsTable() {
    try {
        await db.execute(`drop table if exists groups`);
    } catch (error) {
        throw new Error(String(error));
    }
}

export async function deleteMessagesTable() {
    try {
        await db.execute(`drop table if exists messages`);
    } catch (error) {
        throw new Error(String(error));
    }
}

export async function deleteUserMessagesTable() {
    try {
        await db.execute(`drop table if exists user_messages`);
    } catch (error) {
        throw new Error(String(error));
    }
}

export async function deleteGroupMessagesTable() {
    try {
        await db.execute(`drop table if exists group_messages`);
    } catch (error) {
        throw new Error(String(error));
    }
}

export async function deleteGroupUsersTable() {
    try {
        await db.execute(`drop table if exists group_users`);
    } catch (error) {
        throw new Error(String(error));
    }
}