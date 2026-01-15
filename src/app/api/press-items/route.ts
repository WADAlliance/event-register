import { NextResponse } from 'next/server';
import { getNewsItems } from '@/lib/airtable';

export async function GET() {
    try {
        const newsItems = await getNewsItems();
        return NextResponse.json(newsItems);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('API Error fetching press items:', errorMessage);
        return NextResponse.json(
            { error: 'Failed to fetch news items from Airtable' },
            { status: 500 }
        );
    }
}
