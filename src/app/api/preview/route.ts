import { NextResponse } from 'next/server';
import { generatePreviewToken } from '@/lib/preview-token';


export async function GET() {
  try {
    const token = await generatePreviewToken();
    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error('Error generating preview token:', error);


    return NextResponse.json(
      { error: 'Failed to generate preview token' },
      { status: 500 }
    );
  }
}
