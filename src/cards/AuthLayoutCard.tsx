'use client';

import { LayoutProps } from '@/types';
import { usePathname } from 'next/navigation';

export default function AuthLayoutCard({ children, params }: LayoutProps) {
    const pathName = usePathname();
    const cupSize = pathName.includes('/signup') ? '600px' : '500px';

    return (
        <main className='auth-main'>
            <section id='cup-section' className='auth-form-section' style={{ height: cupSize }}>
                {children}

                <div className='cup-handle' />
                <div className='cup-top' />
            </section>
        </main>
    );
}
