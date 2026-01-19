import { TwitterApi } from 'twitter-api-v2';
import { SocialPost } from './airtable';
import { cache } from './cache';

const CACHE_KEY = 'twitter_latest_post';

function getTwitterClient() {
    const bearerToken = process.env.TWITTER_BEARER_TOKEN;
    if (!bearerToken) {
        console.warn('Twitter API not configured: Missing TWITTER_BEARER_TOKEN');
        return null;
    }
    return new TwitterApi(bearerToken);
}

function getRelativeTime(createdAt: string): string {
    const now = new Date();
    const postDate = new Date(createdAt);
    const diffMs = now.getTime() - postDate.getTime();
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

export async function getLatestTweet(): Promise<SocialPost | null> {
    const cached = cache.get<SocialPost>(CACHE_KEY);
    if (cached) {
        return cached;
    }

    const client = getTwitterClient();
    if (!client) {
        return null;
    }

    const username = process.env.TWITTER_USERNAME;
    if (!username) {
        console.warn('TWITTER_USERNAME not configured');
        return null;
    }

    try {
        console.log(`Fetching latest tweet from @${username}...`);

        const user = await client.v2.userByUsername(username);
        if (!user.data) {
            console.error('Twitter user not found');
            return null;
        }

        const tweets = await client.v2.userTimeline(user.data.id, {
            max_results: 5,
            'tweet.fields': ['created_at', 'text'],
            'user.fields': ['name', 'username']
        });

        if (!tweets.data || tweets.data.data.length === 0) {
            console.warn('No tweets found');
            return null;
        }

        const latestTweet = tweets.data.data[0];

        const post: SocialPost = {
            id: latestTweet.id,
            platform: 'X',
            user: user.data.name,
            handle: `@${user.data.username}`,
            time: getRelativeTime(latestTweet.created_at || new Date().toISOString()),
            content: latestTweet.text,
            avatar: getInitials(user.data.name),
            url: `https://x.com/${user.data.username}/status/${latestTweet.id}`,
            publishedDate: latestTweet.created_at || new Date().toISOString()
        };

        cache.set(CACHE_KEY, post);

        return post;
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Error fetching Twitter post:', errorMessage);
        return null;
    }
}
