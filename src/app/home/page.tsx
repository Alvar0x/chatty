import HomeCard from '@/cards/HomeCard';
import authOptions from '@/config/authOptions';
import { ChatProvider } from '@/contexts/chatContext';
import { getUserGroups } from '@/services/groups';
import { getGroupMessages } from '@/services/messages';
import GroupType from '@/types/client/GroupType';
import MessageType from '@/types/client/MessageType';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';

export const metadata: Metadata = {
    title: 'Home - Chatty',
    description: 'The Chatty Homepage',
};

export default async function Home() {
    const session = await getServerSession(authOptions);
    const groups: GroupType[] = await getUserGroups();
    const messagesByGroup = groups.map(async (group) => {
        const messages = await getGroupMessages(group._id);
        return { groupId: group._id, messages };
    });

    return (
        <ChatProvider initialGroups={groups}>
            <HomeCard session={session} />
        </ChatProvider>
    );
}
