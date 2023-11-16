import SignInCard from '@/cards/SignInCard';
import authOptions from '@/config/authOptions';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';

export const metadata: Metadata = {
    title: 'Sign in - Chatty',
    description: 'The Sign In Page',
};

export default async function LoginPage() {
    const session = await getServerSession(authOptions);

    return <SignInCard />;
}
