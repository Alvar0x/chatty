import SignUpCard from '@/cards/SignUpCard';
import { PageProps } from '@/types';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sign up - Chatty',
    description: 'The Sign Up Page',
};

export default async function SignUpPage({}: PageProps) {
    return <SignUpCard />;
}
