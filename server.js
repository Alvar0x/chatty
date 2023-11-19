import express from 'express';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { createServer } from 'node:http';

dotenv.config();

const PORT = process.env.NEXT_PUBLIC_SOCKET_PORT ?? 3001;

const app = express();
const server = createServer(app);
const io = new Server(server);

async function getGroupMessages(groupId) {
    const requestConfig = {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/messages?groupid=${groupId}`, requestConfig);

    const resultJSON = await result.json();

    return resultJSON;
}

io.on('connection', async (socket) => {
    console.log('An user joined the server');

    socket.on('subscribeToGroup', async (groupId) => {
        socket.join(groupId);
        console.log('User joined to the group ' + groupId);

        const response = await getGroupMessages(groupId);

        socket.emit('initialMessages', response);
    });

    socket.on('sendMessage', async (message) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/messages`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        });

        io.to(message.groupId).emit('newMessage', message);
    });

    socket.on('unsubscribeFromGroup', groupId => {
        console.log('User unsubscribed from ' + groupId)
        socket.leave(groupId);
    });

    socket.on('disconnect', () => {
        console.log('An user left the server');
    });

    if (!socket.recovered) {
       
    }
});

server.listen(PORT, () => {
    console.log(`Socket.io server is listening at port ${PORT}`);
});