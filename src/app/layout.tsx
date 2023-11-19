import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LayoutProps } from '@/types';

export const metadata: Metadata = {
    title: 'Chatty',
    description: 'Chat created by Álvaro Navas using Next 13.5.6',
};

export default function RootLayout({ children }: LayoutProps) {
    return (
        <html lang='en'>
            <head>
                <meta charSet='UTF-8' />
                <meta name='viewport' content='width=device-width, initial-scale=1.0' />
                <link rel='shortcut icon' href='assets/img/chat.png' type='image/x-icon' />
            </head>
            <body>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
