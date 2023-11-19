import { NextRequest } from "next/server";

/*
 * Type of Next pages
 */
export type PageProps =  {
    params: { [key: string] };
    searchParams: { [key: string]: string | string[] | undefined };
}

/*
 * Type of Next layout pages
 */
export type LayoutProps = {
    children?: React.ReactNode;
    params: { [key: string]: string | string[] };
};