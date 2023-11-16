'use client';

import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignInCard() {
    const [error, setError] = useState<string>('');

    const router = useRouter();

    const onSubmitLoginHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        const username = (document.querySelector('.username-input') as HTMLInputElement).value;
        const password = (document.querySelector('.password-input') as HTMLInputElement).value;

        const response = await signIn('credentials', { username, password, redirect: false });

        if (response?.error) {
            setError('Invalid credentials');
            return;
        }

        router.replace('/home');
    };

    return (
        <main className='login-main'>
            <section className='login-form-section'>
                <h1>Sign in</h1>

                <form className='login-form' onSubmit={onSubmitLoginHandler}>
                    <label>
                        <span className='username-label'>Username</span>
                        <input type='text' name='username' className='username-input' placeholder='Enter your username ...' />
                    </label>
                    <label>
                        <span className='password-label'>Password</span>
                        <input type='password' name='password' className='password-input' placeholder='Enter your password ...' />
                    </label>
                    <button type='submit'>Login</button>
                    <Link href='/register'>Register</Link>
                </form>

                <div className='cup-handle' />
                <div className='cup-top' />
            </section>
        </main>
    );
}
