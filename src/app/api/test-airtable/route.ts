import { NextResponse } from 'next/server';
import Airtable from 'airtable';

export async function GET() {
    const baseId = process.env.AIRTABLE_BASE_ID;
    const apiKey = process.env.AIRTABLE_API_KEY;

    if (!baseId || !apiKey) {
        return NextResponse.json({ error: 'Missing env vars', env: { baseId: !!baseId, apiKey: !!apiKey } }, { status: 500 });
    }

    try {
        const base = new Airtable({ apiKey }).base(baseId);
        // Try to list 1 record from 'Orders' table to verify connection
        const records = await base('Orders').select({ maxRecords: 1 }).firstPage();
        return NextResponse.json({ success: true, message: 'Connection successful', recordCount: records.length });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
    }
}
