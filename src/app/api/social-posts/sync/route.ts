import { NextResponse } from 'next/server';
import { getLatestTweet } from '@/lib/twitter';
import { getLatestLinkedInPost } from '@/lib/linkedin';
import { getLatestInstagramPost } from '@/lib/instagram';
import { syncSocialPosts, SocialPost } from '@/lib/airtable';

export async function POST() {
    try {
        const [twitterPost, linkedInPost, instagramPost] = await Promise.all([
            getLatestTweet(),
            getLatestLinkedInPost(),
            getLatestInstagramPost()
        ]);

        const postsToSync: SocialPost[] = [];
        if (twitterPost) postsToSync.push(twitterPost);
        if (linkedInPost) postsToSync.push(linkedInPost);
        if (instagramPost) postsToSync.push(instagramPost);

        if (postsToSync.length === 0) {
            return NextResponse.json(
                { message: 'No new posts found to sync' },
                { status: 200 }
            );
        }

        console.log(`Syncing ${postsToSync.length} posts to Airtable...`);
        await syncSocialPosts(postsToSync);

        return NextResponse.json({
            message: 'Social posts synced successfully',
            syncedCount: postsToSync.length,
            posts: postsToSync
        });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Sync API Error:', errorMessage);
        return NextResponse.json(
            { error: 'Failed to sync social posts', details: errorMessage },
            { status: 500 }
        );
    }
}
