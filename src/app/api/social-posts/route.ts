import { NextResponse } from 'next/server';
import { getSocialPosts } from '@/lib/airtable';

export async function GET() {
    try {
        const posts = await getSocialPosts();

        console.log(`Successfully fetched ${Object.keys(posts).length} social posts from Airtable`);

        return NextResponse.json(posts);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('API Error fetching social posts from Airtable:', errorMessage);
        return NextResponse.json(
            { error: 'Failed to fetch social posts from Airtable' },
            { status: 500 }
        );
    }
}
