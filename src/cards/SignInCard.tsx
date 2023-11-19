'use client';

import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignInCard() {
    const [error, setError] = useState<string>('Error');

    const router = useRouter();

    const onSubmitSignInHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        const username = (document.querySelector('input[name="username"]') as HTMLInputElement).value;
        const password = (document.querySelector('input[name="password"]') as HTMLInputElement).value;

        const response = await signIn('credentials', { username, password, redirect: false });

        if (response?.error) {
            setError('Invalid credentials');
            return;
        }

        router.replace('/home');
    };

    return (
        <>
            <h1>Sign in</h1>
            <form className='auth-form signin' onSubmit={onSubmitSignInHandler}>
                <label>
                    <span className='auth-label'>Username</span>
                    <input type='text' name='username' className='auth-input' placeholder='Enter your username' />
                </label>
                <label>
                    <span className='auth-label'>Password</span>
                    <input type='password' name='password' className='auth-input' placeholder='Enter your password' />
                </label>
                <button type='submit'>Login</button>
                <div className='link-to-other'>
                    <span>You don&apos;t have an account yet?</span>
                    <Link href='/signup'>Sign up</Link>
                </div>
            </form>
            <article className='auth-error-message'>
                <span>{error}</span>
            </article>
        </>
    );
}
