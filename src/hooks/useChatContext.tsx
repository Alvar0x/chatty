'use client';

import { ChatContext } from '@/contexts/chatContext';
import { useContext } from 'react';

export default function useChatContext() {
    const context = useContext(ChatContext);

    if (!context) {
        throw new Error('useChatContext debe ser utilizado dentro de un ChatProvider');
    }

    return context;
}
