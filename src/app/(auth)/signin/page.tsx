import SignInCard from '@/cards/SignInCard';
import { PageProps } from '@/types';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sign in - Chatty',
    description: 'The Sign In Page',
};

export default async function SignInPage({}: PageProps) {
    return <SignInCard />;
}
