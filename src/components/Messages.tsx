'use client';

import useChatContext from '@/hooks/useChatContext';
import Message from './Message';
import MessageType from '@/types/MessageType';
import { Session } from 'next-auth';
import Information from './Information';
import MessageContextMenu from './MessageContextMenu';
import { useState } from 'react';
import ContextMenuProps from '@/types/ContextMenuProps';
import { groupByArray } from '@/utils/general';
import '@/css/messages.css';

type MessagesProps = {
    session: Session | null;
};

export default function Messages({ session }: MessagesProps) {
    const { composedMessages } = useChatContext();
    const [contextMenuProps, setContextMenuProps] = useState<ContextMenuProps>({ open: false, position: { x: 0, y: 0 } });

    return (
        <>
            {composedMessages.length > 0 ? (
                composedMessages.map((cm) =>
                    cm.map((kv, i) =>
                        kv.key === session?.user.id ? (
                            kv.values.length === 1 ? (
                                <Message
                                    key={kv.values[0].id}
                                    message={kv.values[0]}
                                    mine={true}
                                    position='normal'
                                    setContextMenuOpen={setContextMenuProps}
                                />
                            ) : (
                                <div key={`composed-message-${i}`} className={'composed-message my-cm'}>
                                    {kv.values.map((m, j) => (
                                        <Message
                                            key={m.id}
                                            message={m}
                                            mine={true}
                                            position={j === 0 ? 'top' : j === kv.values.length - 1 ? 'bottom' : 'middle'}
                                            setContextMenuOpen={setContextMenuProps}
                                        />
                                    ))}
                                </div>
                            )
                        ) : kv.values.length === 1 ? (
                            <Message
                                key={kv.values[0].id}
                                message={kv.values[0]}
                                mine={false}
                                position='normal'
                                setContextMenuOpen={setContextMenuProps}
                            />
                        ) : (
                            <div key={`composed-message-${i}`} className={'composed-message his-cm'}>
                                {kv.values.map((m, j) => (
                                    <Message
                                        key={m.id}
                                        message={m}
                                        mine={false}
                                        position={j === 0 ? 'top' : j === kv.values.length - 1 ? 'bottom' : 'middle'}
                                        setContextMenuOpen={setContextMenuProps}
                                    />
                                ))}
                            </div>
                        )
                    )
                )
            ) : (
                <Information title='No messages yet' message='Type the first message!' />
            )}
            <MessageContextMenu props={contextMenuProps} setProps={setContextMenuProps} />
        </>
    );
}
