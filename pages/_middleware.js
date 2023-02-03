import { NextResponse } from 'next/server';

export async function middleware(req) {
    const { nextUrl: url, geo } = req;
    const country = geo.country || 'Kenya';

    url.searchParams.set('country', country);

    return NextResponse.rewrite(url);
}