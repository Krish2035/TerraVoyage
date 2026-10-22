import { config } from '../config/index.js';

// Tiered L1 Cache with TTL and Invalidation (Pillars 2, 50)
class CacheService {
  constructor() {
    this.cache = new Map();
    this.hits = 0;
    this.misses = 0;
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) {
      this.misses++;
      return null;
    }
    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      this.misses++;
      return null;
    }
    this.hits++;
    return item.data;
  }

  set(key, data, ttlMs = config.cacheTTLMs) {
    this.cache.set(key, {
      data,
      expiresAt: Date.now() + ttlMs,
      createdAt: Date.now()
    });
  }

  del(key) {
    this.cache.delete(key);
  }

  // Purge by prefix / pattern (Pillar 50)
  invalidatePattern(prefix) {
    for (const key of this.cache.keys()) {
      if (key.startsWith(prefix)) {
        this.cache.delete(key);
      }
    }
  }

  clear() {
    this.cache.clear();
  }

  getStats() {
    return {
      size: this.cache.size,
      hits: this.hits,
      misses: this.misses,
      hitRate: this.hits + this.misses > 0 
        ? `${((this.hits / (this.hits + this.misses)) * 100).toFixed(1)}%` 
        : '0%'
    };
  }
}

export const cacheService = new CacheService();
