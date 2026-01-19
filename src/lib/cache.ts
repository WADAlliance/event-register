/**
 * Simple in-memory cache for social media API responses
 * Helps avoid rate limits by caching responses for a configurable duration
 */

interface CacheEntry<T> {
    data: T;
    timestamp: number;
}

class SimpleCache {
    private cache: Map<string, CacheEntry<unknown>> = new Map();
    private defaultTTL: number;

    constructor(defaultTTLSeconds: number = 900) { // 15 minutes default
        this.defaultTTL = defaultTTLSeconds * 1000; // Convert to milliseconds
    }

    /**
     * Get cached data if it exists and hasn't expired
     */
    get<T>(key: string): T | null {
        const entry = this.cache.get(key) as CacheEntry<T> | undefined;

        if (!entry) {
            return null;
        }

        const now = Date.now();
        const age = now - entry.timestamp;

        if (age > this.defaultTTL) {
            // Cache expired, remove it
            this.cache.delete(key);
            return null;
        }

        return entry.data;
    }

    /**
     * Set cache data with current timestamp
     */
    set<T>(key: string, data: T): void {
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
    }

    /**
     * Clear specific cache entry
     */
    delete(key: string): void {
        this.cache.delete(key);
    }

    /**
     * Clear all cache entries
     */
    clear(): void {
        this.cache.clear();
    }

    /**
     * Get cache statistics
     */
    getStats() {
        return {
            size: this.cache.size,
            keys: Array.from(this.cache.keys())
        };
    }
}

// Singleton instance
const cacheDuration = parseInt(process.env.SOCIAL_CACHE_DURATION || '900', 10);
export const cache = new SimpleCache(cacheDuration);
