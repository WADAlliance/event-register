import axios from 'axios';
import { SocialPost } from './airtable';
import { cache } from './cache';

const CACHE_KEY = 'instagram_latest_post';

function getRelativeTime(timestamp: string): string {
    const now = Date.now();
    const postDate = new Date(timestamp);
    const diffMs = now - postDate.getTime();
    const minutes = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMs / 3600000);
    const days = Math.floor(diffMs / 86400000);
    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    return `${minutes}m`;
}

function getInitials(name: string): string {
    const words = name.trim().split(/\s+/);
    if (words.length === 1) {
        return words[0].substring(0, 2).toUpperCase();
    }
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

export async function getLatestInstagramPost(): Promise<SocialPost | null> {
    const cached = cache.get<SocialPost>(CACHE_KEY);
    if (cached) {
        return cached;
    }

    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const accountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;

    if (!accessToken || !accountId) {
        console.warn('Instagram API not configured: Missing INSTAGRAM_ACCESS_TOKEN or INSTAGRAM_BUSINESS_ACCOUNT_ID');
        return null;
    }

    try {
        const response = await axios.get(
            `https://graph.facebook.com/v18.0/${accountId}/media`,
            {
                params: {
                    fields: 'id,caption,media_type,media_url,permalink,timestamp,username',
                    limit: 1,
                    access_token: accessToken
                }
            }
        );

        if (!response.data || !response.data.data || response.data.data.length === 0) {
            console.warn('No Instagram posts found');
            return null;
        }

        const latestPost = response.data.data[0];

        const post: SocialPost = {
            id: latestPost.id,
            platform: 'Instagram',
            user: latestPost.username || 'Instagram User',
            handle: 'Instagram',
            time: getRelativeTime(latestPost.timestamp),
            content: latestPost.caption || '',
            avatar: getInitials(latestPost.username || 'IG'),
            url: latestPost.permalink,
            image: latestPost.media_type === 'IMAGE' || latestPost.media_type === 'CAROUSEL_ALBUM'
                ? latestPost.media_url
                : undefined,
            publishedDate: latestPost.timestamp
        };

        cache.set(CACHE_KEY, post);

        return post;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error('Instagram API Error:', error.response?.status, error.response?.data);
            if (error.response?.status === 400 || error.response?.status === 190) {
                console.error('TIP: Your Instagram access token may have expired. Generate a new long-lived token.');
            }
        } else {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.error('Error fetching Instagram post:', errorMessage);
        }
        return null;
    }
}
