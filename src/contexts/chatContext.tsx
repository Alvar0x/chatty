'use client';

import { getUserGroups } from '@/services/groups';
import { getGroupMessages } from '@/services/messages';
import GroupType from '@/types/GroupType';
import MessageType from '@/types/MessageType';
import { groupByArray } from '@/utils/general';
import { Dispatch, ReactNode, SetStateAction, createContext, useCallback, useState, useEffect } from 'react';

type Chat = {
    groups: GroupType[];
    currentGroup: GroupType | undefined;
    setCurrentGroup: Dispatch<SetStateAction<GroupType | undefined>>;
    composedMessages: {
        key: string;
        values: MessageType[];
    }[][];
    // getMessages: () => void;
    setMessages: Dispatch<SetStateAction<MessageType[]>>;
    loading: { groups: boolean; messages: boolean };
    error: { groups: string; messages: string };
};

const dateFormat: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
};

export const ChatContext = createContext<Chat>({
    groups: [],
    currentGroup: undefined,
    setCurrentGroup: () => {},
    composedMessages: [],
    // getMessages: () => {},
    setMessages: () => {},
    loading: { groups: false, messages: false },
    error: { groups: '', messages: '' },
});

export function ChatProvider({ initialGroups, children }: { initialGroups: GroupType[]; children: ReactNode }) {
    const [loading, setLoading] = useState({ groups: false, messages: false });
    const [error, setError] = useState({ groups: '', messages: '' });
    const [groups, setGroups] = useState<GroupType[]>(initialGroups);
    const [currentGroup, setCurrentGroup] = useState<GroupType | undefined>(undefined);
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [composedMessages, setComposedMessages] = useState<{ key: string; values: MessageType[] }[][]>([]);

    // const getMessages = useCallback(() => {
    //     try {
    //         setLoading({ ...loading, messages: true });
    //         if (currentGroup) {
    //             getGroupMessages(currentGroup.id).then((response) => {
    //                 if (response.status !== 200) {
    //                     setError({ ...error, messages: response.message });
    //                 } else {
    //                     setMessages(response.data);
    //                     setError({ ...error, messages: '' });
    //                 }
    //             });
    //         } else {
    //             throw new Error('No group selected');
    //         }
    //     } catch (e) {
    //         setError({ ...error, messages: e as string });
    //     } finally {
    //         setLoading({ ...loading, messages: false });
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [currentGroup]);

    useEffect(() => {
        const tempSet = new Set(messages.map((m) => new Date(m.createdAt).toLocaleTimeString([], dateFormat)));
        const differentDates = Array.from(tempSet);
        const cmpMsgs: { key: string; values: MessageType[] }[][] = [];

        for (let i = 0; i < differentDates.length; i++) {
            cmpMsgs[i] = groupByArray(
                messages.filter((m) => new Date(m.createdAt).toLocaleTimeString([], dateFormat) === differentDates[i]),
                'userId'
            );
        }

        setComposedMessages(cmpMsgs);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages]);

    const value: Chat = {
        groups,
        currentGroup,
        setCurrentGroup,
        composedMessages,
        // getMessages,
        setMessages,
        loading,
        error,
    };

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
