import axios from 'axios';
import { SocialPost } from './airtable';
import { cache } from './cache';

const CACHE_KEY = 'linkedin_latest_post';

/**
 * Get relative time string (e.g., "2h", "1d", "3m")
 */
function getRelativeTime(timestamp: number): string {
    const now = Date.now();
    const diffMs = now - timestamp;

    const minutes = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMs / 3600000);
    const days = Math.floor(diffMs / 86400000);

    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    return `${minutes}m`;
}

/**
 * Get initials from a name (e.g., "John Doe" -> "JD")
 */
function getInitials(name: string): string {
    const words = name.trim().split(/\s+/);
    if (words.length === 1) {
        return words[0].substring(0, 2).toUpperCase();
    }
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

export async function getLatestLinkedInPost(): Promise<SocialPost | null> {
    const cached = cache.get<SocialPost>(CACHE_KEY);
    if (cached) {
        return cached;
    }

    const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
    const personId = process.env.LINKEDIN_PERSON_ID; // Your LinkedIn person URN

    if (!accessToken || !personId) {
        console.warn('LinkedIn API not configured: Missing LINKEDIN_ACCESS_TOKEN or LINKEDIN_PERSON_ID');
        return null;
    }

    try {
        console.log('Fetching latest LinkedIn post...');

        // Fetch user's posts using LinkedIn API v2
        const response = await axios.get(
            `https://api.linkedin.com/v2/ugcPosts?q=authors&authors=List(${personId})&count=1&sortBy=LAST_MODIFIED`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'X-Restli-Protocol-Version': '2.0.0',
                    'LinkedIn-Version': '202401'
                }
            }
        );

        if (!response.data || !response.data.elements || response.data.elements.length === 0) {
            console.warn('No LinkedIn posts found');
            return null;
        }

        const latestPost = response.data.elements[0];
        const postText = latestPost.specificContent?.['com.linkedin.ugc.ShareContent']?.shareCommentary?.text || '';
        const createdTime = latestPost.created?.time || Date.now();
        const postId = latestPost.id || '';

        const authorResponse = await axios.get(
            `https://api.linkedin.com/v2/people/${personId}`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'X-Restli-Protocol-Version': '2.0.0'
                }
            }
        );

        const authorName = `${authorResponse.data.localizedFirstName} ${authorResponse.data.localizedLastName}`;
        const authorHeadline = authorResponse.data.headline || 'LinkedIn User';

        const post: SocialPost = {
            id: postId,
            platform: 'LinkedIn',
            user: authorName,
            handle: authorHeadline,
            time: getRelativeTime(createdTime),
            content: postText,
            avatar: getInitials(authorName),
            url: `https://www.linkedin.com/feed/update/${postId}`,
            publishedDate: new Date(createdTime).toISOString()
        };

        cache.set(CACHE_KEY, post);

        return post;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error('LinkedIn API Error:', error.response?.status, error.response?.data);
            if (error.response?.status === 401) {
                console.error('TIP: Your LinkedIn access token may have expired. Generate a new one.');
            }
        } else {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.error('Error fetching LinkedIn post:', errorMessage);
        }
        return null;
    }
}
