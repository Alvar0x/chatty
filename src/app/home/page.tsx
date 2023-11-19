import HomeCard from '@/cards/HomeCard';
import authOptions from '@/config/authOptions';
import { ChatProvider } from '@/contexts/chatContext';
import AuthModel from '@/models/AuthModel';
import { getUserGroups } from '@/services/groups';
import { getGroupMessages } from '@/services/messages';
import { PageProps } from '@/types';
import GroupType from '@/types/GroupType';
import ResponseType from '@/types/ResponseType';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';

export const metadata: Metadata = {
    title: 'Home - Chatty',
    description: 'The Chatty Homepage',
};

export default async function Home({}: PageProps) {
    const session = await getServerSession(authOptions);
    let groups: GroupType[] = [];
    if (session && session.user) {
        const response: ResponseType = await getUserGroups(session.user.id);
        if (response.status === 200) groups = response.data;
    }

    return (
        <ChatProvider initialGroups={groups}>
            <HomeCard session={session} />
        </ChatProvider>
    );
}
