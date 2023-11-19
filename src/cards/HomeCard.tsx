'use client';

import Menu from '@/components/Menu';
import { SendHorizontal } from 'lucide-react';
import useChatContext from '@/hooks/useChatContext';
import { Session } from 'next-auth';
import Loading from '@/components/Loading';
import Messages from '@/components/Messages';
import Welcome from '@/components/Welcome';
import Error from '@/components/Error';
import io from 'socket.io-client';
import { v4 } from 'uuid';
import { useEffect } from 'react';

type HomeCardProps = {
    session: Session | null;
};

const socket = io(`http://localhost:${process.env.NEXT_PUBLIC_SOCKET_PORT}`);

export default function HomeCard({ session }: HomeCardProps) {
    const { setMessages, currentGroup, loading, error } = useChatContext();

    useEffect(() => {
        if (currentGroup) {
            const messagesSection = document.getElementById('messages') as HTMLElement;
            messagesSection.scrollTo({ top: messagesSection.scrollHeight, behavior: 'instant' });

            // Suscribirse al grupo al montar el componente
            socket.emit('subscribeToGroup', currentGroup.id);

            // Manejar mensajes iniciales
            socket.on('initialMessages', (response) => {
                setMessages(response.data);
            });

            // Manejar nuevos mensajes
            socket.on('newMessage', (newMessage) => {
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            });

            return () => {
                socket.emit('unsubscribeFromGroup', currentGroup.id);
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentGroup]);

    const onSubmitFormHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        const input = document.getElementById('message-input') as HTMLInputElement;

        if (input.value.trim() && currentGroup) {
            socket.emit('sendMessage', {
                id: v4(),
                content: input.value.trim(),
                createdAt: new Date(),
                groupId: currentGroup.id,
                userId: session?.user.id,
            });
            input.value = '';
        }
    };

    return (
        <main className='chat-main'>
            <Menu />
            <section className='chat'>
                <article id='messages' className='messages'>
                    {loading.messages ? (
                        <Loading />
                    ) : error.messages ? (
                        <Error title='' message={error.messages.toString()} />
                    ) : currentGroup ? (
                        <Messages session={session} />
                    ) : (
                        <Welcome />
                    )}
                </article>
                <form id='message-form' className='message-form' onSubmit={onSubmitFormHandler}>
                    <input type='text' id='message-input' className='message-input' placeholder='Type a message' autoComplete='off' autoFocus />
                    <button type='submit' className='send-button'>
                        <SendHorizontal color='#fff' fill='#fff' />
                    </button>
                </form>
            </section>
        </main>
    );
}
