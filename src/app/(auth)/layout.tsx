import AuthLayoutCard from '@/cards/AuthLayoutCard';
import { LayoutProps } from '@/types';

export default function AuthLayout({ children, params }: LayoutProps) {
    return <AuthLayoutCard params={params}>{children}</AuthLayoutCard>;
}
