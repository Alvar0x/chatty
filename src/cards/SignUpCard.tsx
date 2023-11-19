'use client';

import { signUp } from '@/services/auth';
import UserType from '@/types/UserType';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpCard() {
    const router = useRouter();
    const [error, setError] = useState<string>('Error');

    const onSubmitSignUpHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        const username = (document.querySelector('input[name="username"]') as HTMLInputElement).value;
        const email = (document.querySelector('input[name="email"]') as HTMLInputElement).value;
        const password = (document.querySelector('input[name="password"]') as HTMLInputElement).value;
        const confirmPassword = (document.querySelector('input[name="confirm-password"]') as HTMLInputElement).value;

        const newUser: UserType = { name: username, email: email, password: password, createdAt: new Date() };

        const response = await signUp(newUser);

        if (response.status !== 200) {
            setError(response.message);
            return;
        }

        router.replace('/signin');
    };

    return (
        <>
            <h1>Sign up</h1>
            <form className='auth-form signup' onSubmit={onSubmitSignUpHandler}>
                <label>
                    <span className='auth-label'>Username</span>
                    <input type='text' name='username' className='auth-input' placeholder='Enter your username' />
                </label>
                <label>
                    <span className='auth-label'>Email</span>
                    <input type='text' name='email' className='auth-input' placeholder='Enter your username' />
                </label>
                <label>
                    <span className='auth-label'>Password</span>
                    <input type='password' name='password' className='auth-input' placeholder='Enter a password' />
                </label>
                <label>
                    <span className='auth-label'>Confirm password</span>
                    <input type='password' name='confirm-password' className='auth-input' placeholder='Enter the password again' />
                </label>
                <button type='submit'>Proceed</button>
                <div className='link-to-other'>
                    <span>You already have an account?</span>
                    <Link href='/signin'>Sign in</Link>
                </div>
            </form>
            <article className='auth-error-message'>
                <span>{error}</span>
            </article>
        </>
    );
}
